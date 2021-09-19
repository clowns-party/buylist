import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import ProductLoaders from '../product/loaders/product.loaders';
import { BuylistService } from './buylist.service';
import { Buylist } from './models/buylist.model';

@Resolver(() => Buylist)
export class BuylistResolver {
  constructor(
    private buylistService: BuylistService,
    private productLoaders: ProductLoaders,
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
    return this.productLoaders.batchAuthors.load(ownerId);
  }
}
