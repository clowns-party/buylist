import { InviteService } from './invite.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtReqUser } from 'src/auth/auth.types';
import { CreateInviteDto } from './dto/create-invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  invite(
    @Request() req: { user: JwtReqUser },
    @Body() invite: CreateInviteDto,
  ) {
    return this.inviteService.create(invite, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/accept/:id')
  accept(@Request() req: { user: JwtReqUser }, @Param('id') id: string) {
    return this.inviteService.accept(Number(id), req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/decline/:id')
  decline(@Request() req: { user: JwtReqUser }, @Param('id') id: string) {
    return this.inviteService.decline(Number(id), req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getUserInites(@Request() req: { user: JwtReqUser }) {
    return this.inviteService.getUserInvites(req.user);
  }
}
