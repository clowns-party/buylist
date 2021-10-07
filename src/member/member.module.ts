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
import { redisConnector } from 'src/utils/connectors/redis.connector';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisConnector(configService),
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
