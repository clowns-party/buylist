import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  RelationId,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('simple-array', { nullable: true })
  coordinate: string[];

  @Column()
  comment: string;

  @Column({ nullable: true })
  buyBefore: Date;

  @Column({ nullable: true })
  color: string;

  @Index('product_authorId_index')
  @ManyToOne((type) => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @RelationId((product: Product) => product.author)
  public authorId: number;
}
