import { JwtReqPayloadUser } from './auth.types';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async find(email: string) {
    return this.usersService.findOne(email);
  }
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
  async login(user: User) {
    const existUser = await this.usersService.findOne(user.email);
    if (!existUser) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const payload: JwtReqPayloadUser = {
        email: existUser.email,
        sub: existUser.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
