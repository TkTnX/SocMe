import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { StoryDto } from 'src/api/story/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { StoryService } from './story.service'

@Controller('stories')
export class StoryController {
	constructor(private readonly storyService: StoryService) {}

	@Protected()
	@Get()
	public async getStories(@Authorized('userId') userId: string) {
		return await this.storyService.getStories(userId)
	}

	@Protected()
	@Post()
	public async create(
		@Body() dto: StoryDto,
		@Authorized('userId') userId: string
  ) {
    return await this.storyService.create(dto, userId)
  }

  @Protected()
  @Delete(":storyId")
  public async delete(@Param("storyId") storyId: string, @Authorized("userId") userId: string) {
    return await this.storyService.delete(storyId, userId)
  }
}
