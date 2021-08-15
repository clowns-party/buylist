import { Statuses } from './../buylist.entity';
export class UpdateBuylistDto {
  public name?: string;

  public description?: string;

  public totalPrice?: number;

  public status?: Statuses;
}
