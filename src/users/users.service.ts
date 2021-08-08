import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        `User with email - ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ id });
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const isExist = await this.findOne(user?.email);
    if (!isExist) {
      const newUser = this.usersRepo.create({
        ...user,
        password: hashedPassword,
      });
      await this.usersRepo.save(newUser);
      const { password, ...result } = newUser;
      return {
        ...result,
        password: undefined,
      };
    }
    throw new HttpException(
      'User with that email already exists',
      HttpStatus.BAD_REQUEST,
    );
  }
}
