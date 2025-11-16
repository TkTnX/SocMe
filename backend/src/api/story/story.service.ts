import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { subDays } from 'date-fns'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { StoryDto } from 'src/api/story/dto'
import { UserService } from 'src/api/user/user.service'


@Injectable()
export class StoryService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async getStories(userId: string) {
		const user = await this.userService.findUserById(userId)

		await this.prismaService.story.deleteMany({
			where: {
				createdAt: {
					lt: subDays(new Date(), 1)
				}
			}
		})

		const stories = await this.prismaService.story.findMany({
			where: {
				OR: [
					{
						user: {
							followers: {
								some: {
									id: user.id
								}
							}
						}
					},
					{
						userId
					}
				]
			},
			include: {
				user: true
			}
		})

		return stories
	}

	public async create(dto: StoryDto, userId: string) {
		const { image, text } = dto
		const user = await this.userService.findUserById(userId)

		if (!user.userSubscription)
			throw new UnauthorizedException(
				'Только премиум пользователи могут публиковать истории'
			)

		const story = await this.prismaService.story.create({
			data: {
				image,
				text,
				userId
			}
		})

		return story
	}

	public async delete(storyId: string, userId: string) {
		const story = await this.getStoryById(storyId)

		if (story.userId !== userId)
			throw new UnauthorizedException('Вы не создатель истории')

		return await this.prismaService.story.delete({
			where: { id: story.id }
		})
	}

	private async getStoryById(storyId: string) {
		const story = await this.prismaService.story.findUnique({
			where: { id: storyId }
		})

		if (!story) throw new NotFoundException('История не найдена')

		return story
	}
}
