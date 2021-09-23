import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BuylistService } from 'src/buylist/buylist.service';
import { User } from 'src/users/models/users.model';
import UsersLoaders from '../users/loaders/users.loaders';

import { Member } from './models/member.model';

@Resolver(() => Member)
export class MemberResolver {
  constructor(
    private buylistService: BuylistService,
    private usersLoaders: UsersLoaders,
  ) {}

  // add Index and RelationId for fetch this relation
  @ResolveField('user', () => User)
  async getOwner(@Parent() member: Member) {
    const { userId } = member;
    return this.usersLoaders.batchAuthors.load(userId);
  }
}
