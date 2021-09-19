import { Product } from 'src/product/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Member } from './../member/member.entity';

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

  @ManyToMany((type) => Product, { nullable: true, onDelete: 'CASCADE' })
  @JoinTable()
  products: Product[];

  @Index('buylist_ownerId_index')
  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  owner: User;

  @RelationId((buylist: Buylist) => buylist.owner)
  public ownerId: number;

  @ManyToMany((type) => Member, { nullable: true, onDelete: 'CASCADE' })
  @JoinTable()
  members: Member[];
}
