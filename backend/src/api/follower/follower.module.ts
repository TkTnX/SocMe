import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { UserService } from 'src/api/user/user.service';
import { GroupService } from 'src/api/group/group.service';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, UserService, GroupService],
})
export class FollowerModule {}
