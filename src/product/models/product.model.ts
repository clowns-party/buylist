import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field({ nullable: true })
  link: string;

  @Field(() => [String], { nullable: true })
  coordinate: string[];

  @Field()
  comment: string;

  @Field({ nullable: true })
  buyBefore: Date;

  @Field({ nullable: true })
  color: string;

  @Field(() => Int)
  authorId: number;

  @Field()
  author: User;
}
