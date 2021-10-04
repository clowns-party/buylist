import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BuylistModule } from './buylist/buylist.module';
import { TypeOrmConfigService } from './config/config.service';
import { InviteModule } from './invite/invite.module';
import { MemberModule } from './member/member.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        ...new TypeOrmConfigService(configService).getTypeOrmConfig(),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
      }),
    }),
    AuthModule,
    UsersModule,
    BuylistModule,
    ProductModule,
    InviteModule,
    MemberModule,
    ProfileModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
