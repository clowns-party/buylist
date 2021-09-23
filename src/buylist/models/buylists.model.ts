import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/users/models/users.model';
import { Statuses } from '../buylist.entity';

registerEnumType(Statuses, {
  name: 'Statuses',
});

@ObjectType()
export class Buylists {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  totalPrice: number;

  @Field((type) => Statuses)
  status: Statuses;

  @Field((type) => [Product])
  products: Product[];

  @Field(() => Int)
  ownerId: number;

  @Field()
  owner: User;
}
