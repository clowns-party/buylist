import { GET_BUYLIST_CACHE_KEY } from './constants/buylistCacheKey.constant';
import { JwtReqUser } from './../auth/auth.types';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Buylist } from './buylist.entity';
import { Repository } from 'typeorm';
import { CreateBuylistDto } from './dto/create-buylist.dto';
import { Member } from 'src/member/member.entity';
import { UpdateBuylistDto } from './dto/update-buylist.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class BuylistService {
  constructor(
    @InjectRepository(Member) private memberRepo: Repository<Member>,
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async clearCache() {
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_BUYLIST_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
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
    await this.clearCache();
    return buyListWithMembers;
  }

  async delete(id: number, user: JwtReqUser) {
    const buylist = await this.findById(id);
    if (buylist && buylist.owner.id === user.id) {
      const result = await this.buylistRepo.delete(id);
      await this.clearCache();
      return result;
    } else {
      throw new HttpException(
        `Buylist not found or you not owner!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, fields: UpdateBuylistDto, user: JwtReqUser) {
    const buylist = await this.findById(id);
    const isMember =
      Boolean(
        buylist?.members?.length &&
          buylist?.members.find((member) => member.id === user?.id),
      ) || buylist?.owner?.id === user.id;

    if (isMember) {
      const updatedFieldsBuylist = {
        ...buylist,
        ...fields,
      };
      const updated = await this.buylistRepo.save(updatedFieldsBuylist);
      await this.clearCache();
      return updated;
    } else {
      throw new HttpException(
        `Permission denied, you not member `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
