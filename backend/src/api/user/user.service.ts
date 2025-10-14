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
}
