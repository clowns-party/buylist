import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Buylist } from './buylist.entity';
import { Repository } from 'typeorm';
import { CreateBuylistDto } from './dto/create-buylist.dto';
import { JwtReqUser } from 'src/auth/auth.types';
import { Member } from 'src/member/member.entity';

@Injectable()
export class BuylistService {
  constructor(
    @InjectRepository(Member) private memberRepo: Repository<Member>,
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
  ) {}

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
      relations: ['products', 'members'],
    });
    if (!list) {
      throw new HttpException(
        `List with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return list;
  }
}
