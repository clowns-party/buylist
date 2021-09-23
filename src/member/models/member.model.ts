import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Buylist } from 'src/buylist/models/buylist.model';
import { User } from 'src/users/models/users.model';

@ObjectType()
export class Member {
  @Field(() => Int)
  id: number;

  // @Field()
  // buylist: Buylist;

  @Field()
  user: User;

  @Field(() => Int)
  userId: number;
}
