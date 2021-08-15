import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public phone: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
}
