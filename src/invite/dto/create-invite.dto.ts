import { ApiProperty } from '@nestjs/swagger';

export class CreateInviteDto {
  @ApiProperty()
  public buyListId: number;
  @ApiProperty()
  public to: number;
}
