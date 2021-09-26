import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Member } from 'src/member/models/member.model';
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
