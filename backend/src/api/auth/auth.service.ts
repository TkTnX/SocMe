import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from 'generated/prisma';
import { SignInDto, SignUpDto } from 'src/api/auth/dto';
import { UserService } from 'src/api/user/user.service';





@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	public async signUp(dto: SignUpDto) {
		const user = await this.userService.findUserByEmail(dto.email)

		if (user) throw new BadRequestException('Почта уже занята!')

		const hashedPassword = await argon.hash(dto.password)

		const newUser = await this.userService.create({
			...dto,
			password: hashedPassword
		})

		return await this.generateToken(newUser)
	}

	public async signIn(dto: SignInDto) {
		const { email, password } = dto

        const user = await this.userService.findUserByEmail(email)

        if(!user) throw new NotFoundException("Пользователь с такой почтой не найден!")
        
        const verified = await argon.verify(user.password!, password)

        if (!verified) throw new UnauthorizedException("Неверные почта или пароль")
        
        
        return await this.generateToken(user)

	}

	private async generateToken(user: User) {
		const payload = { sub: user.id, email: user.email }

		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}