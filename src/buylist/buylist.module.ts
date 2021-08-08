import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BuylistService } from './buylist.service';
import { Buylist } from './buylist.entity';
import { BuylistController } from './buylist.controller';
import { Member } from 'src/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buylist, Member])],
  providers: [BuylistService],
  controllers: [BuylistController],
})
export class BuylistModule {}
