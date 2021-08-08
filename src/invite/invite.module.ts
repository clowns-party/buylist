import { Member } from './../member/member.entity';
import { UsersService } from './../users/users.service';
import { BuylistService } from './../buylist/buylist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { Invite } from './invite.entity';
import { Buylist } from 'src/buylist/buylist.entity';
import { User } from 'src/users/user.entity';
import { MemberService } from 'src/member/member.service';
import { InviteController } from './invite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invite, Buylist, User, Member])],
  providers: [InviteService, BuylistService, UsersService, MemberService],
  controllers: [InviteController],
})
export class InviteModule {}
