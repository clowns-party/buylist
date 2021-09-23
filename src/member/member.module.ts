import { UsersService } from './../users/users.service';
import { Member } from './member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { Buylist } from 'src/buylist/buylist.entity';
import { BuylistService } from 'src/buylist/buylist.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import UsersLoaders from 'src/users/loaders/users.loaders';
import { User } from 'src/users/user.entity';
import { MemberResolver } from './member.resolver';

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
    TypeOrmModule.forFeature([Member, Buylist, User]),
  ],
  providers: [
    MemberService,
    BuylistService,
    UsersLoaders,
    UsersService,
    MemberResolver,
  ],
})
export class MemberModule {}
