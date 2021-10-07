import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redisConnector } from 'src/utils/connectors/redis.connector';
export const PUB_SUB = 'PUB_SUB';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: (configService: ConfigService) =>
        new RedisPubSub({
          connection: redisConnector(configService, true),
        }),
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
