import { User } from 'src/users/user.entity';

export class CreateMemberDto {
  public buylistId: number;

  public user: User;
}
