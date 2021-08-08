import { MemberService } from './../member/member.service';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtReqUser } from 'src/auth/auth.types';
import { BuylistService } from 'src/buylist/buylist.service';
import { Repository } from 'typeorm';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Invite, InviteStatuses } from './invite.entity';

@Injectable()
export class InviteService {
  constructor(
    private readonly buylistService: BuylistService,
    private readonly usersService: UsersService,
    private readonly memberService: MemberService,
    @InjectRepository(Invite) private inviteRepo: Repository<Invite>,
  ) {}

  async findById(id: number) {
    const invite = await this.inviteRepo.findOne(id, {
      relations: ['buylist', 'from', 'to'],
    });
    if (!invite) {
      throw new HttpException(
        `Invite with id - ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return invite;
  }

  async create(invite: CreateInviteDto, user: JwtReqUser) {
    if (user.id === invite.to) {
      throw new HttpException(
        'You can`t invite yourself',
        HttpStatus.BAD_REQUEST,
      );
    }
    const buylist = await this.buylistService.findById(invite.buyListId);
    // Нужна проверка пользователя, есть ли он в этом списке(для from), для приглашения
    const to = await this.usersService.findById(invite.to);
    const created = this.inviteRepo.create({
      buylist,
      to,
      from: user,
      status: InviteStatuses.EXPECTATION,
    });
    await this.inviteRepo.save(created);
    return created;
  }

  async accept(id: number, user: JwtReqUser) {
    const invite = await this.findById(id);
    if (invite.status !== InviteStatuses.EXPECTATION) {
      throw new HttpException(
        `You cannot accept this invitation because the status - ${invite.status}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (invite.to.id !== user.id) {
      throw new HttpException(
        'This is not your invitation',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.memberService.create({
      user: invite.to,
      buylistId: invite.buylist.id,
    });
    invite.status = InviteStatuses.ACCEPTED;
    const updatedInvite = await this.inviteRepo.save(invite);
    return updatedInvite;
  }
}
