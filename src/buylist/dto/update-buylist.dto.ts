import { ApiProperty } from '@nestjs/swagger';
import { Statuses } from './../buylist.entity';
export class UpdateBuylistDto {
  @ApiProperty()
  public name?: string;

  @ApiProperty()
  public description?: string;

  @ApiProperty()
  public totalPrice?: number;

  @ApiProperty()
  public status?: Statuses;
}
