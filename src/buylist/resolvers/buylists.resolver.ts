import { CacheKey, CacheTTL, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { User } from 'src/users/models/users.model';
import { GraphqlHttpCacheInterceptor } from 'src/utils/interceptors/GraphqlHttpCache.interceptor';
import { HttpCacheInterceptor } from 'src/utils/interceptors/httpCache.interceptor';
import UsersLoaders from '../../users/loaders/users.loaders';
import { BuylistService } from '../buylist.service';
import { GET_BUYLIST_CACHE_KEY } from '../constants/buylistCacheKey.constant';
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

  @UseGuards(GraphqlJwtAuthGuard)
  // @UseInterceptors(GraphqlJwtAuthGuard, GraphqlHttpCacheInterceptor)
  // @CacheKey(GET_BUYLIST_CACHE_KEY)
  // @CacheTTL(120)
  @Query(() => [Buylists])
  async myBuylists(@Context() context: { req: { user: JwtReqUser } }) {
    const buylists = await this.buylistService.getUserBuylists(
      context.req.user,
    );
    return buylists;
  }

  // add Index and RelationId for fetch this relation
  @ResolveField('owner', () => User)
  async getOwner(@Parent() buylist: Buylists) {
    const { ownerId } = buylist;
    return this.usersLoaders.batchAuthors.load(ownerId);
  }
}
