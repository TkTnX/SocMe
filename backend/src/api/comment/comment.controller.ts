import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentDto, CommentResponseDto } from 'src/api/comment/dto';
import { Authorized, Protected } from 'src/common/decorators';



import { CommentService } from './comment.service';





@Controller('comments')
@ApiTags('Comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get(':postId')
	@ApiOkResponse({ type: [CommentResponseDto] })
	public async getPostComments(@Param('postId') postId: string) {
		return await this.commentService.getPostComments(postId)
	}

	@Protected()
	@Post(':postId')
	@ApiCreatedResponse({ type: CommentResponseDto })
	public async createComment(
		@Param('postId') postId: string,
		@Body() dto: CommentDto,
		@Authorized('userId') userId: string
	) {
		return await this.commentService.createComment(postId, dto, userId)
	}

	@Protected()
	@Patch(':commentId')
	@ApiCreatedResponse({ type: CommentResponseDto })
	public async editComment(
		@Param('commentId') commentId: string,
		@Body() dto: CommentDto
	) {
		return await this.commentService.editComment(commentId, dto)
	}

	@Protected()
	@Delete(':commentId')
	@ApiCreatedResponse({ type: CommentResponseDto })
	public async deleteComment(@Param('commentId') commentId: string) {
		return await this.commentService.deleteComment(commentId)
	}
}