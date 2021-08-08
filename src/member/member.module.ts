import { Member } from './member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { Buylist } from 'src/buylist/buylist.entity';
import { BuylistService } from 'src/buylist/buylist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Buylist])],
  providers: [MemberService, BuylistService],
})
export class MemberModule {}
