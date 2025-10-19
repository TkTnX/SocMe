import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { Request, Response } from 'express'
import { User } from 'generated/prisma'
import { SignInDto, SignUpDto } from 'src/api/auth/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'
import { isDev } from 'src/common/helpers'
import { IPayload } from 'src/common/types'

@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService
	) {}

	public async signUp(res: Response, dto: SignUpDto) {
		const user = await this.userService.findUserByEmail(dto.email)

		if (user) throw new BadRequestException('Почта уже занята!')

		const hashedPassword = await argon.hash(dto.password)

		const newUser = await this.userService.create({
			...dto,
			password: hashedPassword
		})

		return await this.auth(res, newUser)
	}

	public async signIn(res: Response, dto: SignInDto) {
		const { email, password } = dto

		const user = await this.userService.findUserByEmail(email)

		if (!user)
			throw new NotFoundException(
				'Пользователь с такой почтой не найден!'
			)

		const verified = await argon.verify(user.password!, password)

		if (!verified)
			throw new UnauthorizedException('Неверные почта или пароль')

		return await this.auth(res, user)
	}

	public async getMe(userPayload: IPayload) {
		const { userId } = userPayload

		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId
			},
			// include: {
			// 	posts: true,
			// 	followers: true,
			// 	followings: true,
			// }
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	// Генерация токенов с помощью jwtService
	private async generateToken(user: User) {
		const payload: IPayload = { userId: user.id, email: user.email }
		return {
			access_token: await this.jwtService.signAsync(payload, {
				expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL')
			}),
			refresh_token: await this.jwtService.signAsync(payload, {
				expiresIn: this.configService.getOrThrow(
					'JWT_REFRESH_TOKEN_TTL'
				)
			})
		}
	}

	// Добавление refreshToken в cookie
	private setCookie(res: Response, value: string, expires: Date) {
		const isDevEnv = isDev(this.configService)

		res.cookie('refreshToken', value, {
			httpOnly: true,
			path: '/',
			domain: this.configService.getOrThrow('COOKIE_DOMAIN'),
			expires,
			secure: !isDevEnv,
			sameSite: isDevEnv ? undefined : 'none'
		})
	}

	// Метод для возвращения access_token и установки refreshToken
	private async auth(res: Response, user: User) {
		const { access_token, refresh_token } = await this.generateToken(user)

		this.setCookie(
			res,
			refresh_token,
			new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
		)

		return access_token
	}

	// Рефреш токена
	public async refresh(req: Request) {
		const refreshToken = req.cookies['refreshToken']
		if (!refreshToken)
			throw new UnauthorizedException('Недействительный refresh token')

		const payload = await this.jwtService.verifyAsync(refreshToken)

		if (payload) {
			const user = await this.prismaService.user.findUnique({
				where: {
					id: payload.userId
				}
			})

			if (!user) throw new NotFoundException('Пользователь не найден!')

			const { access_token } = await this.generateToken(user)
			return { access_token }
		}
	}
}
