import { Controller, Param, Post } from '@nestjs/common'
import { Authorized, Protected } from 'src/common/decorators'

import { FollowService } from './follow.service'

@Controller('follows')
export class FollowController {
	constructor(private readonly followService: FollowService) {}

	@Protected()
	@Post(':followingToId')
	public async follow(
		@Authorized('userId') userId: string,
		@Param('followingToId') followingToId: string
	) {
		return await this.followService.follow(userId, followingToId)
	}
}
