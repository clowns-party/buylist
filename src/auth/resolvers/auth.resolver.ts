import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { GraphqlLocalAuthGuard } from '../guards/graphql-local-auth.guard';
import { AuthLoginInput } from '../inputs/auth-login.input';
import { AuthRegisterInput } from '../inputs/auth-register.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  async register(@Args('input') userData: AuthRegisterInput) {
    return this.usersService.register(userData);
  }

  @UseGuards(GraphqlLocalAuthGuard)
  @Mutation(() => String)
  async login(@Args('input') loginData: AuthLoginInput) {
    const { access_token } = await this.authService.login(loginData);
    return access_token;
  }
}
