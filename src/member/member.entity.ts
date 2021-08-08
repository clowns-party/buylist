import { Buylist } from 'src/buylist/buylist.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Buylist)
  @JoinColumn({ name: 'buylistId' })
  buylist: Buylist;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
