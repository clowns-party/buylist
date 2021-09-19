import { Injectable, Scope } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export default class BuylistsLoaders {
  constructor(private usersService: UsersService) {}

  public readonly batchOwners = new DataLoader(async (ownersIds: number[]) => {
    const users = await this.usersService.getByIds(ownersIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return ownersIds.map((authorId) => usersMap.get(authorId));
  });
}
