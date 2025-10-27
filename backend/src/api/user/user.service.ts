import {
	BadGatewayException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { SignUpDto } from 'src/api/auth/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(UserService.name)

	public async findUsers(userId: string) {
		const users = await this.prismaService.user.findMany({
			// TODO: TEMP, потом на странице people понадобится динамическое значение
			take: 3,
			
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
					}
				]
			}
		})

		return users
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

	public async findUserByEmail(email: string) {
		return await this.prismaService.user.findFirst({
			where: {
				email
			}
		})
	}

	public async findUserById(userId: string) {
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
				followings: true
			},
			omit: {
				password: true,
				provider: true
			}
		})

		if (!user) throw new NotFoundException('Пользователь не найден!')

		return user
	}
}
