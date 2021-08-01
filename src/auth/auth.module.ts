import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, UsersModule],
})
export class AuthModule {}
