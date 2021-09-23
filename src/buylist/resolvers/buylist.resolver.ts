import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import UsersLoaders from '../../users/loaders/users.loaders';
import { BuylistService } from '../buylist.service';
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
}
