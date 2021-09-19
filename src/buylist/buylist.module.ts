import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { Member } from 'src/member/member.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from './../users/users.service';
import { BuylistController } from './buylist.controller';
import { Buylist } from './buylist.entity';
import { BuylistResolver } from './buylist.resolver';
import { BuylistService } from './buylist.service';
import BuylistsLoaders from './loaders/buylist.loaders';

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
    TypeOrmModule.forFeature([Buylist, Member, User]),
  ],
  providers: [BuylistService, BuylistResolver, UsersService, BuylistsLoaders],
  controllers: [BuylistController],
})
export class BuylistModule {}
