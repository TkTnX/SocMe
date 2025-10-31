import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class HashtagService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async getHashtags(name: string) {
		const hashtags = await this.prismaService.hashtag.findMany({
			where: {
				name: {
					contains: name === 'undefined' ? undefined : name,
					mode: 'insensitive'
				}
			}
		})

		return hashtags
	}

	public async addHashtagToFavorites(hashtagId: string, userId: string) {
		const user = await this.userService.findUserById(userId)

		if (user.hashtags.find(hashtag => hashtag.id === hashtagId)) {
			return await this.prismaService.user.update({
				where: { id: user.id },
				data: {
					hashtags: {
						disconnect: {
							id: hashtagId
						}
					}
				}
			})
		}

		return await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				hashtags: {
					connect: {
						id: hashtagId
					}
				}
			}
		})
	}
}
