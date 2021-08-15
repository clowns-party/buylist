import { ApiProperty } from '@nestjs/swagger';
import { Statuses } from './../buylist.entity';
export class CreateBuylistDto {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public totalPrice: number;
  @ApiProperty()
  public status: Statuses;
}
