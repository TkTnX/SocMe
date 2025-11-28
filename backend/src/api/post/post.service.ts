import {
	BadGatewayException,
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { PostDto } from 'src/api/post/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class PostService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}
	private readonly logger = new Logger(PostService.name)

	public async getPosts(userId: string, query?: Record<string, string>) {
		const user = await this.userService.findUserById(userId)
		const page = Number(query?.page) || 0
		const limit = 8

		const where: Prisma.PostWhereInput = {
			...(!query?.hashtag
				? {
						OR: [
							{
								groupId: {
									in: user.followingGroups.map(
										group => group.groupId
									)
								}
							},
							{
								AND: [
									{ groupId: null },
									{
										user: {
											OR: [
												{
													followers: {
														some: {
															followerId: user.id
														}
													}
												},
												{ id: user.id }
											]
										}
									}
								]
							}
						]
					}
				: {}),
			...(query?.text
				? {
						text: {
							contains: query.text,
							mode: 'insensitive'
						}
					}
				: {}),
			...(query?.hashtag
				? {
						hashtags: {
							some: {
								name: {
									equals: query?.hashtag
										? `#${query.hashtag}`
										: undefined,
									mode: 'insensitive'
								}
							}
						}
					}
				: {})
		}


		const totalPosts = await this.prismaService.post.count({ where })
		const totalPages = Math.round(totalPosts / limit)
		const posts = await this.prismaService.post.findMany({
			include: {
				user: {
					include: {
						followers: true,
						userSubscription: true
					}
				},
				hashtags: true,
				likes: true,
				comments: true,
				favorites: true,
				group: true
			},
			where,
			orderBy: {
				createdAt: 'desc'
			},

			take: limit,
			skip: limit * page
		})

		return { posts, totalPages }
	}

	public async getPostById(id: string) {
		const post = await this.prismaService.post.findUnique({
			where: { id },
			include: {
				user: true,
				likes: true,
				comments: true,
				hashtags: true
			}
		})

		if (!post) throw new NotFoundException('Пост не найден!')

		return post
	}

	// Создание постов
	public async create(dto: PostDto, userId: string) {
		const newPost = await this.prismaService.post.create({
			data: {
				...dto,
				userId,
				hashtags: {
					connectOrCreate: dto.hashtags?.map(tag => ({
						where: { name: tag },
						create: { name: tag }
					}))
				}
			}
		})

		if (!newPost) {
			this.logger.error('Ошибка при создании поста!')
			throw new BadGatewayException('Не удалось создать пост!')
		}

		return newPost
	}

	// Редактирование постов
	public async edit(dto: PostDto, postId: string, userId: string) {
		const post = await this.getPostById(postId)

		if (post.userId !== userId)
			throw new UnauthorizedException('Вы не можете изменить этот пост!')

		const updatedPost = await this.prismaService.post.update({
			where: {
				id: post.id
			},
			data: {
				...dto,
				updatedAt: new Date(),
				hashtags: {
					set: [],
					connectOrCreate: dto?.hashtags?.map(tag => ({
						where: { name: tag },
						create: { name: tag }
					}))
				}
			}
		})

		return updatedPost
	}

	// Удаление постов
	public async delete(postId: string, userId: string) {
		const post = await this.getPostById(postId)

		if (post.userId !== userId)
			throw new UnauthorizedException('Вы не можете удалить этот пост!')

		return await this.prismaService.post.delete({ where: { id: post.id } })
	}
}
