import { Controller, Param, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ELikeType } from 'generated/prisma'
import { Authorized, Protected } from 'src/common/decorators'

import { LikeService } from './like.service'
import { LikeResponseDto } from 'src/api/like/dto'

@Controller('likes')
@ApiTags('Likes')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@Protected()
  @Post('/:type/:id')
    @ApiCreatedResponse({type: LikeResponseDto})
	public async like(
		@Param('type') type: ELikeType,
		@Param('id') id: string,
		@Authorized('userId') userId: string
	) {
		return await this.likeService.like(type, id, userId)
	}
}
