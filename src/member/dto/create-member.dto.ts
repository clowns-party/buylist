import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class CreateMemberDto {
  @ApiProperty()
  public buylistId: number;
  @ApiProperty()
  public user: User;
}
