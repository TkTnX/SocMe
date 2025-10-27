import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { PostDto } from 'src/api/post/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { PostService } from './post.service'

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	// Создание постов
	@Protected()
	@Post()
	public async create(
		@Body() dto: PostDto,
		@Authorized('userId') userId: string
	) {
		return await this.postService.create(dto, userId)
	}

	// Редактирование постов

	@Protected()
	@Patch(':postId')
	public async edit(
		@Body() dto: PostDto,
		@Param('postId') postId: string,
		@Authorized('userId') userId: string
	) {
		return await this.postService.edit(dto, postId, userId)
	}

	// Удаление постов
	@Protected()
	@Delete(':postId')
	public async delete(
		@Param('postId') postId: string,
		@Authorized('userId') userId: string
	) {
		return await this.postService.delete(postId, userId)
	}

	// Получение постов
	@Protected()
	@Get()
	public async getPosts(@Authorized('userId') userId: string) {
		return await this.postService.getPosts(userId)
	}
}
