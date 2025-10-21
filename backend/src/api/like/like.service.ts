import { Injectable } from '@nestjs/common'
import { Comment, ELikeType, Hashtag, Post } from 'generated/prisma'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class LikeService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async like(type: ELikeType, id: string, userId: string) {
		let likedItem: null | Comment | Post | Hashtag = null

		const isLiked = await this.prismaService.like.findFirst({
			where: {
				AND: [
					{
						userId
					},
					{
						likedId: id
					}
				]
			}
		})

		if (isLiked) {
			return await this.prismaService.like.delete({
				where: { id: isLiked.id }
			})
		}

		switch (type) {
			case 'COMMENT':
				likedItem = await this.prismaService.comment.findUnique({
					where: { id }
				})
				break
			case 'POST':
				likedItem = await this.prismaService.post.findUnique({
					where: { id }
				})
				break
			case 'HASHTAG':
				likedItem = await this.prismaService.hashtag.findUnique({
					where: { id }
				})
				break
		}

		const like = await this.prismaService.like.create({
			data: {
				type,
				userId,
				likedId: id,
				[`${type.toLowerCase()}Id`]: id
			}
		})

		return like
	}
}
