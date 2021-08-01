import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  register(@Body() user: CreateUserDto) {
    return this.usersService.register(user);
  }
}
