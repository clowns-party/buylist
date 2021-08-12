import { JwtReqUser } from './../auth/auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Buylist } from './buylist.entity';
import { Repository } from 'typeorm';
import { CreateBuylistDto } from './dto/create-buylist.dto';
import { Member } from 'src/member/member.entity';

@Injectable()
export class BuylistService {
  constructor(
    @InjectRepository(Member) private memberRepo: Repository<Member>,
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
  ) {}

  async getAll(): Promise<Buylist[]> {
    const lists = await this.buylistRepo.find({ relations: ['products'] });
    return lists;
  }

  async getOne(id: string) {
    const list = await this.buylistRepo.findOne({
      where: { id },
      relations: ['products', 'products.author', 'owner', 'members'],
    });
    if (!list) {
      throw new HttpException(
        `List with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return list;
  }

  async findById(id: number) {
    const list = await this.buylistRepo.findOne(id, {
      relations: ['products', 'members', 'owner'],
    });
    if (!list) {
      throw new HttpException(
        `List with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return list;
  }

  async create(list: CreateBuylistDto, user: JwtReqUser): Promise<Buylist> {
    const newList = this.buylistRepo.create(list);
    newList.owner = user;
    const buylist = await this.buylistRepo.save(newList);

    const firstMember = this.memberRepo.create({
      buylist,
      user,
    });
    await this.memberRepo.save(firstMember);
    buylist.members = [firstMember];
    const buyListWithMembers = await this.buylistRepo.save(buylist);

    return buyListWithMembers;
  }

  async delete(id: number, user: JwtReqUser) {
    const buylist = await this.findById(id);
    if (buylist && buylist.owner.id === user.id) {
      const result = await this.buylistRepo.delete(id);
      return result;
    } else {
      throw new HttpException(
        `Buylist not found or you not owner!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
