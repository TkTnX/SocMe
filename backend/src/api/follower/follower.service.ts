import { Injectable } from '@nestjs/common'
import { GroupService } from 'src/api/group/group.service'
import { NotificationService } from 'src/api/notification/notification.service'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'
import { followNotification } from 'src/configs'

@Injectable()
export class FollowerService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly groupService: GroupService,
		private readonly notificationService: NotificationService
	) {}

	public async follow(
		followingToId: string,
		type: 'GROUP' | 'USER',
		userId: string
	) {
		const isUserFollow = type === 'USER'

		const user = await this.userService.findUserById(userId)
		const target = isUserFollow
			? await this.userService.findUserById(followingToId)
			: await this.groupService.getGroupById(followingToId)

		const isFollowed = isUserFollow
			? await this.prismaService.follower.findFirst({
					where: {
						AND: [
							{ followerId: user.id },
							{ followingToId: target.id }
						]
					}
				})
			: await this.prismaService.groupFollower.findFirst({
					where: {
						AND: [{ groupId: target.id }, { userId: user.id }]
					}
				})

		if (isFollowed) {
			if (isUserFollow) {
				return await this.prismaService.follower.delete({
					where: { id: isFollowed.id }
				})
			}

			return await this.prismaService.groupFollower.delete({
				where: { id: isFollowed.id }
			})
		}

		if (isUserFollow) {
			await this.notificationService.createNotification({
				...followNotification,
				userId: target.id
			})

			return await this.prismaService.follower.create({
				data: {
					followerId: user.id,
					followingToId: target.id
				}
			})
		}

		return await this.prismaService.groupFollower.create({
			data: {
				userId: user.id,
				groupId: target.id
			}
		})
	}
}
