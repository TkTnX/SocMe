import {
	BadGatewayException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common'
import * as argon from 'argon2'
import { SignUpDto } from 'src/api/auth/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { EditProfileDto, PartialEditProfileDto } from 'src/api/user/dto'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(UserService.name)

	public async findUsers(
		userId: string,
		isPeoplePage: boolean = false,
		query?: string
	) {
		const users = await this.prismaService.user.findMany({
			// TODO: TEMP, потом на странице people понадобится динамическое значение
			take: !isPeoplePage ? 3 : undefined,
			where: {
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
							contains: query ? query : undefined,
							mode: 'insensitive'
						}
					}
				]
			}
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
		const { password, ...restDto } = dto

		let hashedPassword = user.password
		if (password && password !== '') {
			hashedPassword = await argon.hash(password)
		}

		return this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				password: hashedPassword,
				...restDto
			}
		})
	}
}
