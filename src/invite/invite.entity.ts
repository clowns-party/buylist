import { Buylist } from 'src/buylist/buylist.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum InviteStatuses {
  EXPECTATION = 'expectation',
  ACCEPTED = 'accepted',
}

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Buylist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'buylistId' })
  buylist: Buylist;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userFromId' })
  from: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userToId' })
  to: User;

  @Column({
    type: 'enum',
    enum: InviteStatuses,
    default: InviteStatuses.EXPECTATION,
  })
  status: InviteStatuses;
}
