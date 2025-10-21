import { Controller, Param, Post } from '@nestjs/common';



import { FollowerService } from './follower.service';
import { Authorized, Protected } from 'src/common/decorators';





@Controller('followers')
export class FollowerController {
	constructor(private readonly followerService: FollowerService) {}

  @Protected()
	@Post(':followingToId')
  public async follow(@Param('followingToId') followingToId: string, @Authorized("userId") userId: string) {
    return await this.followerService.follow(followingToId, userId)
  }
}