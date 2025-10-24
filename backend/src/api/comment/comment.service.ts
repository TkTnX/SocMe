import { Injectable, NotFoundException } from '@nestjs/common'
import { CommentDto } from 'src/api/comment/dto'
import { PostService } from 'src/api/post/post.service'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class CommentService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly postService: PostService
	) {}

	public async getPostComments(postId: string) {
		const post = await this.postService.getPostById(postId)

		const comments = await this.prismaService.comment.findMany({
			where: {
				postId: post.id
			},
			include: {
				user: true,
				likes: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		if (!comments.length) return []

		const map = new Map<string, any>()
		const roots: any[] = []

		for (const comment of comments) {
			map.set(comment.id, {...comment, replies: []})
		}

		for (const comment of comments) {
			if (comment.replyToId) {
				const parent = map.get(comment.replyToId)

				if (parent) {
					parent.replies.push(map.get(comment.id))
				}
			} else {
				roots.push(map.get(comment.id))
			}
		}

		return roots
	}

	public async createComment(
		postId: string,
		dto: CommentDto,
		userId: string
	) {
		const post = await this.postService.getPostById(postId)

		const newComment = await this.prismaService.comment.create({
			data: {
				postId: post.id,
				...dto,
				userId
			}
		})

		return newComment
	}

	public async editComment(commentId: string, dto: CommentDto) {
		const comment = await this.getCommentById(commentId)

		return await this.prismaService.comment.update({
			where: {
				id: comment.id
			},
			data: dto
		})
	}

	public async deleteComment(commentId: string) {
		const comment = await this.getCommentById(commentId)

		return await this.prismaService.comment.delete({
			where: {
				id: comment.id
			}
		})
	}

	private async getCommentById(commentId: string) {
		const comment = await this.prismaService.comment.findUnique({
			where: { id: commentId }
		})

		if (!comment) throw new NotFoundException('Комментарий не найден!')

		return comment
	}
}
