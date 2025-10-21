import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class FollowerService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async follow(followingToId: string, userId: string) {
		const user = await this.userService.findUserById(userId)
		const followingTo = await this.userService.findUserById(followingToId)

		const isFollowed = await this.prismaService.follower.findFirst({
			where: {
				AND: [
					{ followerId: user.id },
					{ followingToId: followingTo.id }
				]
			}
        })
        
        if (isFollowed) {
            return await this.prismaService.follower.delete({ where: { id: isFollowed.id } })
        } else {
            return await this.prismaService.follower.create({
                data: {
                    followerId: user.id,
                    followingToId: followingTo.id
            }})
        }
	}
}
