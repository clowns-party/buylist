import { JwtReqUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req: { user: JwtReqUser }) {
    return req.user;
  }
}
