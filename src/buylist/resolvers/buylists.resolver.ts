import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import UsersLoaders from '../../users/loaders/users.loaders';
import { BuylistService } from '../buylist.service';
import { Buylists } from '../models/buylists.model';

@Resolver(() => Buylists)
export class BuylistsResolver {
  constructor(
    private buylistService: BuylistService,
    private usersLoaders: UsersLoaders,
  ) {}

  @Query(() => [Buylists])
  async buylists() {
    const buylists = await this.buylistService.getAll();
    return buylists;
  }
  // add Index and RelationId for fetch this relation
  @ResolveField('owner', () => User)
  async getOwner(@Parent() buylist: Buylists) {
    const { ownerId } = buylist;
    return this.usersLoaders.batchAuthors.load(ownerId);
  }
}
