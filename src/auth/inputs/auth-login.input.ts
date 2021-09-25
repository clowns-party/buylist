import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthLoginInput {
  @Field()
  public email: string;
  @Field()
  public password: string;
}
