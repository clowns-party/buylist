import { Member } from './member.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuylistService } from 'src/buylist/buylist.service';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Buylist } from 'src/buylist/buylist.entity';

@Injectable()
export class MemberService {
  constructor(
    private readonly buylistService: BuylistService,
    @InjectRepository(Member) private memberRepo: Repository<Member>,
    @InjectRepository(Buylist) private buylistRepo: Repository<Buylist>,
  ) {}

  async create(member: CreateMemberDto) {
    const currentMember = member.user;
    const buylist = await this.buylistService.findById(member.buylistId);
    const membersExist = buylist.members?.length;
    const exist =
      membersExist &&
      buylist.members.find((member) => member.user?.id === currentMember?.id);
    if (exist) {
      throw new HttpException(
        `This member is already on the list`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newMember = this.memberRepo.create({
      buylist,
      user: currentMember,
    });
    await this.memberRepo.save(newMember);
    if (membersExist) {
      buylist.members.push(newMember);
    } else {
      buylist.members = [newMember];
    }
    const updatedList = await this.buylistRepo.save(buylist);
    return updatedList;
  }
}
