import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostDto, PostResponseDto } from 'src/api/post/dto';
import { Authorized, Protected } from 'src/common/decorators';



import { PostService } from './post.service';





@Controller('posts')
@ApiTags('Posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	// Создание постов
	@Protected()
	@Post()
	@ApiCreatedResponse({ type: PostResponseDto })
	public async create(
		@Body() dto: PostDto,
		@Authorized('userId') userId: string
	) {
		return await this.postService.create(dto, userId)
	}

	// Редактирование постов

	@Protected()
	@Patch(':postId')
	@ApiCreatedResponse({ type: PostResponseDto })
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
	@ApiOkResponse({ type: PostResponseDto })
	public async delete(
		@Param('postId') postId: string,
		@Authorized('userId') userId: string
	) {
		return await this.postService.delete(postId, userId)
	}

	// Получение постов
	@Protected()
	@Get()
	@ApiOkResponse({ type: [PostResponseDto] })
	public async getPosts(
		@Authorized('userId') userId: string,
		@Query() query?: Record<string, string>
	) {
		return await this.postService.getPosts(userId, query)
	}

	@Get(':postId')
	@ApiOkResponse({ type: PostResponseDto })
	public async getPostById(@Param('postId') postId: string) {
		return await this.postService.getPostById(postId)
	}
}