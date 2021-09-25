import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { User } from 'src/users/models/users.model';

@Resolver(() => User)
export class ProfileResolver {
  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => User)
  async profile(@Context() context: { req: { user: JwtReqUser } }) {
    return context?.req?.user;
  }
}
