import { Controller, Param, Post } from '@nestjs/common';



import { FollowerService } from './follower.service';
import { Authorized, Protected } from 'src/common/decorators';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FollowerResponseDto } from 'src/api/follower/dto';





@Controller('followers')
  @ApiTags("Followers")
export class FollowerController {
	constructor(private readonly followerService: FollowerService) {}

  @Protected()
  @Post(':followingToId/:type')
    @ApiCreatedResponse({type: FollowerResponseDto})
  public async follow(@Param('followingToId') followingToId: string, @Param("type") type:"GROUP" | "USER", @Authorized("userId") userId: string) {
    return await this.followerService.follow(followingToId,type, userId)
  }

  
}