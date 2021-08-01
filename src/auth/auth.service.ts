import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(email);
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { password, ...result } = user;
      return {
        ...result,
        password: undefined,
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
