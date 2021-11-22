import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UpdateUserInput } from '../inputs/update-user.input';
import { User } from '../models/users.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('input') userData: UpdateUserInput,
    @Context() context: { req: { user: JwtReqUser } },
  ) {
    const updatedUser = await this.usersService.updateUser(
      userData,
      context?.req?.user,
    );
    return updatedUser;
  }

  @Query(() => [User])
  async searchUsers(@Args('query') query: string) {
    const users = await this.usersService.searchUsers(query);
    return users;
  }
}
