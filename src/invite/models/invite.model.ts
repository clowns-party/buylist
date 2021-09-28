import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Buylist } from 'src/buylist/models/buylist.model';
import { User } from 'src/users/models/users.model';
import { InviteStatuses } from '../invite.entity';

registerEnumType(InviteStatuses, {
  name: 'InviteStatuses',
});

@ObjectType()
export class Invite {
  @Field(() => Int)
  id: number;

  @Field((type) => Buylist)
  buylist: Buylist;

  // userFromId
  @Field()
  from: User;

  // userToId
  @Field()
  to: User;

  @Field((type) => InviteStatuses, { defaultValue: InviteStatuses.EXPECTATION })
  status: InviteStatuses;
}
