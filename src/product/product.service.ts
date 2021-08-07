import { UsersService } from './../users/users.service';
import { CreateProductBuyList } from './dto/create-product-buylist.dto';
import { Product } from 'src/product/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistService } from 'src/buylist/buylist.service';
import { Buylist } from 'src/buylist/buylist.entity';
import { JwtReqUser } from 'src/auth/auth.types';

@Injectable()
export class ProductService {
  constructor(
    private readonly buylistService: BuylistService,
    private readonly usersService: UsersService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
  ) {}

  async findProduct(id: number) {
    const product = await this.productRepo.findOne(id);
    return product;
  }

  async createProductForBuylist(
    newProduct: CreateProductBuyList,
    user: JwtReqUser,
  ) {
    const { buylistId, ...product } = newProduct;
    const list = await this.buylistService.findById(buylistId);
    const createdProduct = this.productRepo.create({
      ...product,
    });

    createdProduct.author = user;
    const savedProduct = await this.productRepo.save(createdProduct);
    if (list?.products) {
      list.products.push(savedProduct);
    } else {
      list.products = [savedProduct];
    }

    const updatedList = await this.buylistRepo.save(list);
    return updatedList;
  }
}
