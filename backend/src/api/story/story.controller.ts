import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StoryDto, StoryResponseDto } from 'src/api/story/dto';
import { Authorized, Protected } from 'src/common/decorators';



import { StoryService } from './story.service';





@Controller('stories')
@ApiTags('Stories')
export class StoryController {
	constructor(private readonly storyService: StoryService) {}

	@Protected()
	@Get()
	@ApiOkResponse({ type: [StoryResponseDto] })
	public async getStories(@Authorized('userId') userId: string) {
		return await this.storyService.getStories(userId)
	}

	@Protected()
	@Post()
	@ApiCreatedResponse({ type: StoryResponseDto })
		@ApiBody({type: StoryDto})
	public async create(
		@Body() dto: StoryDto,
		@Authorized('userId') userId: string
	) {
		return await this.storyService.create(dto, userId)
	}

	@Protected()
	@Delete(':storyId')
	@ApiOkResponse({ type: StoryResponseDto })
	public async delete(
		@Param('storyId') storyId: string,
		@Authorized('userId') userId: string
	) {
		return await this.storyService.delete(storyId, userId)
	}
}