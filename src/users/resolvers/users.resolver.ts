import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/users.model';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { JwtReqUser } from 'src/auth/auth.types';
import { updateUserInput } from '../inputs/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('input') userData: updateUserInput,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    const updatedUser = await this.usersService.updateUser(
      userData,
      context?.req?.user,
    );
    return updatedUser;
  }
}
