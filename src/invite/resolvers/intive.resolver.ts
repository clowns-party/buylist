import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { Buylist } from 'src/buylist/models/buylist.model';
import { InviteService } from '../invite.service';
import { Invite } from '../models/invite.model';

@Resolver(() => Invite)
export class InviteResolver {
  constructor(
    private readonly inviteService: InviteService, // private usersLoaders: UsersLoaders,
  ) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => [Invite])
  async myInvites(@Context() context: { req: { user: JwtReqUser } }) {
    return this.inviteService.getUserInvites(context.req.user);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Invite)
  async acceptInvite(
    @Args('id', { type: () => Int }) inviteId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.inviteService.accept(inviteId, context.req.user);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Buylist)
  async declineInvite(
    @Args('id', { type: () => Int }) inviteId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.inviteService.decline(inviteId, context.req.user);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Buylist)
  async invite(
    @Args('buyListId', { type: () => Int }) buyListId: number,
    @Args('toUserId', { type: () => Int }) toUserId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.inviteService.create(
      { buyListId, to: toUserId },
      context.req.user,
    );
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => Boolean)
  async leave(
    @Args('id', { type: () => Int }) inviteId: number,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    return this.inviteService.leave(inviteId, context.req.user);
  }
}
