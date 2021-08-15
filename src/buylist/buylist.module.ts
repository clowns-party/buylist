import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { BuylistService } from './buylist.service';
import { Buylist } from './buylist.entity';
import { BuylistController } from './buylist.controller';
import { Member } from 'src/member/member.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('RESIS_PORT'),
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([Buylist, Member]),
  ],
  providers: [BuylistService],
  controllers: [BuylistController],
})
export class BuylistModule {}
