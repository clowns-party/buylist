import { Field, InputType } from '@nestjs/graphql';
import { Statuses } from '../buylist.entity';

@InputType()
export class CreateBuylistInput {
  @Field()
  public name: string;
  @Field()
  public description: string;
  @Field()
  public totalPrice: number;
  @Field((type) => Statuses)
  public status: Statuses;
}
