import { UsersService } from './../users/users.service';
import { Product } from 'src/product/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { Buylist } from 'src/buylist/buylist.entity';
import { BuylistService } from 'src/buylist/buylist.service';
import { ProductController } from './product.controller';
import { User } from 'src/users/user.entity';
import { Member } from 'src/member/member.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { ProductResolver } from './resolvers/product.resolver';
import UsersLoaders from 'src/users/loaders/users.loaders';
import { redisConnector } from 'src/utils/connectors/redis.connector';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisConnector(configService),
    }),
    TypeOrmModule.forFeature([Product, Buylist, User, Member]),
  ],
  providers: [
    ProductService,
    BuylistService,
    UsersService,
    ProductResolver,
    UsersLoaders,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
