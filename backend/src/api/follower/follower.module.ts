import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { UserService } from 'src/api/user/user.service';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, UserService],
})
export class FollowerModule {}
