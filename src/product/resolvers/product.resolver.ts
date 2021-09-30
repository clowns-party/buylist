import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { Buylist } from 'src/buylist/models/buylist.model';
import UsersLoaders from 'src/users/loaders/users.loaders';
import { User } from 'src/users/models/users.model';
import { ProductsGuards } from '../guards/products.guard';
import { CreateProductBuyListInput } from '../inputs/create-product-buylist.input';
import { UpdateProductBuyListInput } from '../inputs/update-product-buylist.input';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private usersLoaders: UsersLoaders,
  ) {}

  // Todo maybe guard, only owners or members from current buylist with this product, can view?
  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    const product = await this.productService.findProduct(id);
    return product;
  }
  // add Index and RelationId for fetch this relation
  @ResolveField('author', () => User)
  async getOwner(@Parent() buylist: Product) {
    const { authorId } = buylist;
    return this.usersLoaders.batchAuthors.load(authorId);
  }

  @UseGuards(GraphqlJwtAuthGuard, ProductsGuards)
  @Mutation(() => Buylist)
  async createProduct(
    @Args('input') product: CreateProductBuyListInput,
    @Args('buyListId', { type: () => Int }) buyListId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.productService.createProduct(
      product,
      buyListId,
      context?.req?.user,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard, ProductsGuards)
  @Mutation(() => Buylist)
  async updateProduct(
    @Args('input') product: UpdateProductBuyListInput,
    @Args('buyListId', { type: () => Int }) buyListId: number,
    @Args('productId', { type: () => Int }) productId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.productService.updateProduct({
      fields: product,
      productId,
      buyListId,
    });
  }

  @UseGuards(GraphqlJwtAuthGuard, ProductsGuards)
  @Mutation(() => Buylist)
  async deleteProduct(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('buyListId', { type: () => Int }) buyListId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.productService.deleteProduct(productId, buyListId);
  }
}
