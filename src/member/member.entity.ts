import { Buylist } from 'src/buylist/buylist.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  RelationId,
} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Buylist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buylistId' })
  buylist: Buylist;

  @Index('member_userId_index')
  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((member: Member) => member.user)
  public userId: number;
}
