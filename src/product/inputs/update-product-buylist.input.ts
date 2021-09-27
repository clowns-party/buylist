import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductBuyListInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  price?: number;
  @Field({ nullable: true })
  link?: string;
  @Field((type) => [String], { nullable: true })
  coordinate?: string[];
  @Field({ nullable: true })
  comment?: string;
  @Field({ nullable: true })
  buyBefore?: Date;
  @Field({ nullable: true })
  color?: string;
}
