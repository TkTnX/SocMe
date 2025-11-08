import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { EditGroupDto, GroupDto, PartialEditGroupDto } from 'src/api/group/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class GroupService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getGroups(query?: Record<string, string>) {
		let where: Prisma.GroupWhereInput = {
			name: {
				contains: query?.name ? query.name : undefined,
				mode: 'insensitive'
			}
		}
		let orderBy: Prisma.GroupOrderByWithRelationInput = {}

		if (query?.followers) {
			orderBy = {
				followers: {
					_count: 'desc'
				}
			}
		}

		return await this.prismaService.group.findMany({
			where,
			include: {
				followers: true
			},
			orderBy,
			// TODO: Пагинация
			take: 8
		})
	}

	public async createGroups(dto: GroupDto, userId: string) {
		const newGroup = await this.prismaService.group.create({
			data: {
				...dto,
				admins: {
					connect: {
						id: userId
					}
				}
			}
		})

		if (!newGroup)
			throw new BadGatewayException('Ошибка при создании сообщества')

		return newGroup
	}

	public async editGroup(
		groupId: string,
		dto: PartialEditGroupDto,
		userId: string
	) {
		const group = await this.getGroupById(groupId)

		if (!group.admins.find(admin => admin.id === userId)) {
			throw new BadGatewayException('Вы не админ сообщества!')
		}

		return this.prismaService.group.update({
			where: {
				id: group.id
			},
			data: {
				...dto,
				admins: {
					set: dto.admins?.map(id => ({ id }))
				}
			}
		})
	}

	public async deleteGroup(groupId: string) {
		const group = await this.getGroupById(groupId)

		return await this.prismaService.group.delete({
			where: { id: group.id }
		})
	}

	public async getGroupById(groupId: string) {
		const group = await this.prismaService.group.findUnique({
			where: { id: groupId },
			include: {
				followers: {
					include: {
						user: true
					}
				},
				posts: {
					include: {
						comments: true,
						likes: true,
						user: true,
						group: true
					}
				},
				admins: true
			}
		})

		if (!group) throw new NotFoundException('Сообщество не найдено')

		return group
	}
}
