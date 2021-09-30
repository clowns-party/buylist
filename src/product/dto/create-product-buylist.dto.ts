import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBuyList {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public price: number;
  @ApiProperty()
  public link?: string;
  @ApiProperty()
  public coordinate?: string[];
  @ApiProperty()
  public comment: string;
  @ApiProperty()
  public buyBefore?: Date;
  @ApiProperty()
  public color?: string;
}
