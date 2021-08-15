import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductBuyList {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  price?: number;
  @ApiProperty()
  link?: string;
  @ApiProperty()
  coordinate?: string[];
  @ApiProperty()
  comment?: string;
  @ApiProperty()
  buyBefore?: Date;
  @ApiProperty()
  color?: string;
}
