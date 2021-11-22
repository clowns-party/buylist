import {
  CACHE_KEY_METADATA,
  CacheInterceptor,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';

@Injectable()
export class GraphqlHttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const ctx = GqlExecutionContext.create(context);
    const request: { user: JwtReqUser; _parsedUrl: { query?: string } } =
      ctx.getContext().req;

    // Cached only user collection
    const cacheKey = this.reflector.get(CACHE_KEY_METADATA, ctx.getHandler());
    const cacheUserKey = request?.user?.email;

    if (cacheKey && cacheUserKey) {
      return `${cacheKey}-${request?._parsedUrl?.query || ''}-${cacheUserKey}`;
    }

    return super.trackBy(context);
  }
}
