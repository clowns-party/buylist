import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const redisConnector = (
  configService: ConfigService,
  withoutStore?: boolean,
) => {
  const base = {
    host: configService.get('REDIS_HOST'),
    port: configService.get('RESIS_PORT'),
    ttl: 120,
    password: configService.get('REDIS_AUTH'),
    db: configService.get('REDIS_DB'),
  };
  if (withoutStore) {
    return base;
  }
  return {
    ...base,
    store: redisStore,
  };
};
