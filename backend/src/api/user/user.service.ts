import {
	BadGatewayException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common'
import * as argon from 'argon2'
import { EGender, Prisma } from 'generated/prisma'
import { SignUpDto } from 'src/api/auth/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { PartialEditProfileDto } from 'src/api/user/dto'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(UserService.name)

	public async findUsers(userId: string, query: Record<string, string>) {
		let where: Prisma.UserWhereInput = {
			AND: [
				{
					NOT: {
						id: userId
					}
				},
				{
					followers: {
						none: {
							followerId: userId
						}
					}
				},
				{
					name: {
						contains: query.value ? query.value : undefined,
						mode: 'insensitive'
					}
				},
				{
					gender:
						query.gender && query.gender !== 'any'
							? (query.gender as EGender)
							: undefined
				},
				{
					city: {
						contains: query.city ? query.city : undefined,
						mode: 'insensitive'
					}
				}
			]
		}

		if (query.act) {
			where.followings = {
				some: {
					followingToId: userId
				}
			}
		}

		if (query.ageFrom || query.ageTo) {
			const now = new Date()

			let gteDate // нижняя граница возраста
			let lteDate // верхняя граница возраста

			if (query.ageFrom) {
				lteDate = new Date(
					now.getFullYear() - Number(query.ageFrom),
					now.getMonth(),
					now.getDate()
				)
			}

			if (query.ageTo) {
				gteDate = new Date(
					now.getFullYear() - Number(query.ageTo) - 1,
					now.getMonth(),
					now.getDate() + 1
				)
			}

			where.birthdayDate = {
				...(gteDate && { gte: gteDate }),
				...(lteDate && { lte: lteDate })
			}
		}

		const users = await this.prismaService.user.findMany({
			take: !query.isPeoplePage ? 3 : undefined,
			where
		})

		return users
	}

	public async findUserByEmail(email: string) {
		return await this.prismaService.user.findFirst({
			where: {
				email
			}
		})
	}

	public async findUserById(userId: string, takePassword: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
			include: {
				posts: {
					where: {
						groupId: null
					},

					include: {
						user: true,
						likes: true,
						comments: true
					}
				},
				followers: true,
				followings: true,
				hashtags: true
			},
			omit: {
				password: !takePassword ? true : false,
				provider: true
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден!')

		return user
	}

	public async create(dto: SignUpDto) {
		const user = await this.prismaService.user.create({
			data: dto
		})

		if (!user) {
			this.logger.error('Не удалось зарегистрировать пользователя')
			throw new BadGatewayException('Не удалось зарегистрироваться!')
		}

		return user
	}

	public async edit(dto: PartialEditProfileDto, userId: string) {
		const user = await this.findUserById(userId)
		const { password, birthdayDate, ...restDto } = dto

		let hashedPassword = user.password
		if (password && password !== '') {
			hashedPassword = await argon.hash(password)
		}

		let birthDate
		if (birthdayDate) {
			birthDate = new Date(birthdayDate)
		}

		return this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				password: hashedPassword,
				birthdayDate: birthDate,
				...restDto
			}
		})
	}
}
