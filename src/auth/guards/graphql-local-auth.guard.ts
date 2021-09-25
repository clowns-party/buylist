import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    // take args
    const args = ctx?.getArgs();
    const argsArray = args && Object.values(args);
    // mutate body
    if (argsArray && argsArray?.length) {
      // take only first args (make for if you want get all)
      const objArgs = typeof argsArray[0] === 'object' ? argsArray[0] : {};
      request.body = {
        ...request.body,
        ...objArgs,
      };
    }

    return request;
  }
}
