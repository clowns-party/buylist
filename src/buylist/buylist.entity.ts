import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

export enum Statuses {
  CREATED = 'created',
  CURRENT = 'current',
  CLOSED = 'closed',
}

@Entity()
export class Buylist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0, type: 'int' })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: Statuses,
    default: Statuses.CREATED,
  })
  status: Statuses;

  @ManyToMany((type) => Product, (product) => product.buylists, {
    nullable: true,
  })
  products: Product[];
}
