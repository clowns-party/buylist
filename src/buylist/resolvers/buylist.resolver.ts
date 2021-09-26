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
import { User } from 'src/users/models/users.model';
import UsersLoaders from '../../users/loaders/users.loaders';
import { BuylistService } from '../buylist.service';
import { CreateBuylistInput } from '../inputs/create-buylist.input';
import { UpdateBuylistInput } from '../inputs/update-buylist.input';
import { Buylist } from '../models/buylist.model';

@Resolver(() => Buylist)
export class BuylistResolver {
  constructor(
    private buylistService: BuylistService,
    private usersLoaders: UsersLoaders,
  ) {}

  @Query(() => Buylist)
  async buylist(@Args('id', { type: () => Int }) id: number) {
    const buylist = await this.buylistService.findById(id);
    return buylist;
  }

  @ResolveField('owner', () => User)
  async getOwner(@Parent() buylist: Buylist) {
    const { ownerId } = buylist;
    return this.usersLoaders.batchAuthors.load(ownerId);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Buylist)
  async createList(
    @Args('input') list: CreateBuylistInput,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.buylistService.create(list, context?.req?.user);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Buylist)
  async updateList(
    @Args('input') list: UpdateBuylistInput,
    @Args('id', { type: () => Int }) listId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.buylistService.update(listId, list, context?.req?.user);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteList(
    @Args('id', { type: () => Int }) listId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    const deleted = await this.buylistService.delete(
      listId,
      context?.req?.user,
    );
    return Boolean(deleted);
  }
}
