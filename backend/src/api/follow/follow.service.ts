import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class FollowService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async follow(userId: string, followingToId: string) {
		const isFollowed = await this.prismaService.follower.findFirst({
			where: {
				AND: [{ followerId: userId }, { followingToId }]
			}
		})

		if (isFollowed) {
			return await this.prismaService.follower.delete({
				where: { id: isFollowed.id }
			})
		}

		return await this.prismaService.follower.create({
			data: {
				followerId: userId,
				followingToId
			}
		})
	}
}
