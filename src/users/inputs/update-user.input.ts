import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class updateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  email: string;
}
