import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import { BuylistService } from './buylist.service';
import BuylistsLoaders from './loaders/buylist.loaders';
import { Buylist } from './models/buylist.model';

@Resolver(() => Buylist)
export class BuylistResolver {
  constructor(
    private buylistService: BuylistService,
    private buylistsLoaders: BuylistsLoaders,
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
    return this.buylistsLoaders.batchOwners.load(ownerId);
  }
  //   @ResolveField('Product_author', () => User)
  //   async getAuthor(@Parent() product: Product) {
  //     const { authorId } = product;
  //     return this.usersService.findById(authorId);
  //   }
}
