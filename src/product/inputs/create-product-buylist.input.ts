import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductBuyListInput {
  @Field()
  public name: string;
  @Field()
  public price: number;
  @Field({ nullable: true })
  public link?: string;
  @Field({ nullable: true })
  public imageUrl?: string;
  @Field((type) => [String], { nullable: true })
  public coordinate?: string[];
  @Field()
  public comment: string;
  @Field({ nullable: true })
  public buyBefore?: Date;
  @Field({ nullable: true })
  public color?: string;
}
