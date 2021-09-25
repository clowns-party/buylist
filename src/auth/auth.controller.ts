import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as RequestExpress } from 'express';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.usersService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestExpress & { body: User }) {
    const { access_token, cookie } = await this.authService.login(req.body);
    req.res.setHeader('Set-Cookie', cookie);
    return { access_token };
  }
}
