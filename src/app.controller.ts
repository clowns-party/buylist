import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User } from './users/user.entity';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtReqUser } from './auth/auth.types';
import { Request as RequestExpress } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: RequestExpress & { body: User }) {
    const { access_token, cookie } = await this.authService.login(req.body);
    req.res.setHeader('Set-Cookie', cookie);
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: JwtReqUser }) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
