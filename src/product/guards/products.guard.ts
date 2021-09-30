import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtReqUser } from 'src/auth/auth.types';
import { Buylist } from 'src/buylist/buylist.entity';
import { BuylistService } from 'src/buylist/buylist.service';

@Injectable()
export class ProductsGuards implements CanActivate {
  constructor(private readonly buylistService: BuylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request: { user: JwtReqUser } = ctx.getContext().req;

    const buylistId = ctx.getArgs()?.buyListId;
    const user = request.user;
    if (!buylistId || !user) {
      return false;
    }
    const buylist = await this.buylistService.findById(buylistId);

    if (this.hasAccess(user, buylist)) {
      return true;
    } else {
      return false;
    }
  }

  isOwner(user: JwtReqUser, buylist: Buylist) {
    return buylist?.owner?.id === user.id;
  }

  isMember(user: JwtReqUser, buylist: Buylist) {
    const exist = buylist?.members?.find((member) => member.userId === user.id);
    return Boolean(exist);
  }

  hasAccess(user: JwtReqUser, buylist: Buylist) {
    const owner = this.isOwner(user, buylist);
    const member = this.isMember(user, buylist);
    return owner || member;
  }
}
