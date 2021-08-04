import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BuylistService } from './buylist.service';
import { Buylist } from './buylist.entity';
import { BuylistController } from './buylist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Buylist])],
  providers: [BuylistService],
  controllers: [BuylistController],
})
export class BuylistModule {}
