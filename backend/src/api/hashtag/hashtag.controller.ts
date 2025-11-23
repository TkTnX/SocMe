import { Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { HashtagResponseDto } from 'src/api/hashtag/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { HashtagService } from './hashtag.service'

@Controller('hashtags')
@ApiTags('Hashtags')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get()
	@ApiOkResponse({ type: [HashtagResponseDto] })
	public async getHashtags(@Query('name') name: string) {
		return await this.hashtagService.getHashtags(name)
	}

	@Protected()
	@Post(':hashtagId')
	@ApiCreatedResponse({ type: HashtagResponseDto })
	public async addHashtagToFavorites(
		@Param('hashtagId') hashtagId: string,
		@Authorized('userId') userId: string
	) {
		return await this.hashtagService.addHashtagToFavorites(
			hashtagId,
			userId
		)
	}
}
