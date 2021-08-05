import { ProductService } from './../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Buylist } from './buylist.entity';
import { Repository } from 'typeorm';
import { CreateBuylistDto } from './dto/create-buylist.dto';

@Injectable()
export class BuylistService {
  constructor(
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
  ) {}

  async create(list: CreateBuylistDto): Promise<Buylist> {
    const newList = this.buylistRepo.create(list);
    await this.buylistRepo.save(newList);
    return newList;
  }

  async getAll(): Promise<Buylist[]> {
    const lists = await this.buylistRepo.find({ relations: ['products'] });
    return lists;
  }

  async getOne(id: string) {
    const list = await this.buylistRepo.findOne({
      where: { id },
      relations: ['products', 'products.author'],
    });
    return list;
  }

  async findById(id: number) {
    const list = await this.buylistRepo.findOne(id, {
      relations: ['products'],
    });

    return list;
  }
}
