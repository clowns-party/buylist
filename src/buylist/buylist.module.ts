import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { Member } from 'src/member/member.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from './../users/users.service';
import { BuylistController } from './buylist.controller';
import { Buylist } from './buylist.entity';
import { BuylistsResolver } from './resolvers/buylists.resolver';
import { BuylistService } from './buylist.service';
import UsersLoaders from '../users/loaders/users.loaders';
import { BuylistResolver } from './resolvers/buylist.resolver';
import { redisConnector } from 'src/utils/connectors/redis.connector';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisConnector(configService),
    }),
    TypeOrmModule.forFeature([Buylist, Member, User]),
  ],
  providers: [
    BuylistService,
    BuylistsResolver,
    BuylistResolver,
    UsersService,
    UsersLoaders,
  ],
  controllers: [BuylistController],
})
export class BuylistModule {}
