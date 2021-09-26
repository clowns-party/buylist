import { Field, InputType } from '@nestjs/graphql';
import { Statuses } from '../buylist.entity';

@InputType()
export class UpdateBuylistInput {
  @Field({ nullable: true })
  public name?: string;
  @Field({ nullable: true })
  public description?: string;
  @Field({ nullable: true })
  public totalPrice?: number;
  @Field((type) => Statuses, { nullable: true })
  public status?: Statuses;
}
