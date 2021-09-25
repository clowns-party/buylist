import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthRegisterInput {
  @Field()
  public firstName: string;
  @Field()
  public lastName: string;
  @Field()
  public phone: string;
  @Field()
  public email: string;
  @Field()
  public password: string;
}
