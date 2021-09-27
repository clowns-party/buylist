import { UsersService } from './../users/users.service';
import { CreateProductBuyList } from './dto/create-product-buylist.dto';
import { Product } from 'src/product/product.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistService } from 'src/buylist/buylist.service';
import { Buylist } from 'src/buylist/buylist.entity';
import { JwtReqUser } from 'src/auth/auth.types';
import { checkoutExistProductInBuylist } from 'src/utils/products';
import { UpdateProductBuyList } from './dto/update-product-buylist.dto';

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
    if (!product) {
      throw new HttpException(
        `Product with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async createProduct(newProduct: CreateProductBuyList, user: JwtReqUser) {
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

  async deleteProduct(productId: number, buyListId: number) {
    const buyList = await this.buylistService.findById(buyListId);
    const { product, notEmpty } = checkoutExistProductInBuylist(
      buyList,
      productId,
    );
    if (notEmpty && product) {
      buyList.products = buyList.products.filter(
        (product) => product.id !== productId,
      );
      const clearedBuylist = await this.buylistRepo.save(buyList);
      await this.productRepo.delete(product.id);
      return clearedBuylist;
    } else {
      throw new HttpException(
        `Product or current product not found in buylist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  // Todo guard for check as CREATOR or Member!
  async updateProduct(updateProduct: {
    fields: UpdateProductBuyList;
    productId: number;
    buyListId: number;
  }) {
    const { fields, productId, buyListId } = updateProduct;
    const buyList = await this.buylistService.findById(buyListId);
    let currentProduct = await this.findProduct(productId);

    const { product: productInList, notEmpty } = checkoutExistProductInBuylist(
      buyList,
      productId,
    );

    if (notEmpty && productInList && currentProduct) {
      currentProduct = {
        ...currentProduct,
        ...fields,
      };
      const updated = await this.productRepo.save(currentProduct);
      buyList.products = buyList.products.map((product) =>
        product.id === updated.id ? updated : product,
      );
      const updatedList = await this.buylistRepo.save(buyList);
      return updatedList;
    } else {
      throw new HttpException(
        `Product or current product not found in buylist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
