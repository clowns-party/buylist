import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Member } from 'src/member/models/member.model';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/users/models/users.model';
import { Statuses } from '../buylist.entity';
import { Buylists } from './buylists.model';

registerEnumType(Statuses, {
  name: 'Statuses',
});

@ObjectType()
export class Buylist extends Buylists {
  @Field((type) => [Member])
  members: Member[];
}
