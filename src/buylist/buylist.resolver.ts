import { UsersService } from './../users/users.service';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/users.model';
import { Buylist } from './buylist.model';
import { BuylistService } from './buylist.service';
import { Product } from 'src/product/product.model';

@Resolver(() => Buylist)
export class BuylistResolver {
  constructor(
    private buylistService: BuylistService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Buylist])
  async buylists() {
    const buylists = await this.buylistService.getAll();
    return buylists;
  }
  // add Index and RelationId for fetch this relation
  @ResolveField('owner', () => User)
  async getOwner(@Parent() buylist: Buylist) {
    const { ownerId } = buylist;
    return this.usersService.findById(ownerId);
  }
  //   @ResolveField('Product_author', () => User)
  //   async getAuthor(@Parent() product: Product) {
  //     const { authorId } = product;
  //     return this.usersService.findById(authorId);
  //   }
}
