import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileResolver } from './profile.resolver';

@Module({
  providers: [ProfileResolver],
  controllers: [ProfileController],
})
export class ProfileModule {}
