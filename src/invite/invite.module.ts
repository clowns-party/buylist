import { Member } from './../member/member.entity';
import { UsersService } from './../users/users.service';
import { BuylistService } from './../buylist/buylist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { Invite } from './invite.entity';
import { Buylist } from 'src/buylist/buylist.entity';
import { User } from 'src/users/user.entity';
import { MemberService } from 'src/member/member.service';
import { InviteController } from './invite.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { InviteResolver } from './resolvers/intive.resolver';
import { redisConnector } from 'src/utils/connectors/redis.connector';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisConnector(configService),
    }),
    TypeOrmModule.forFeature([Invite, Buylist, User, Member]),
  ],
  providers: [
    InviteService,
    BuylistService,
    UsersService,
    MemberService,
    InviteResolver,
  ],
  controllers: [InviteController],
})
export class InviteModule {}
