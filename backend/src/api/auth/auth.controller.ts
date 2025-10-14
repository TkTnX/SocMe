import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards
} from '@nestjs/common'
import { User } from 'generated/prisma'
import { SignInDto, SignUpDto } from 'src/api/auth/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('sign-up')
	public async signUp(@Body() dto: SignUpDto) {
		return await this.authService.signUp(dto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	public async signIn(@Body() dto: SignInDto) {
		return await this.authService.signIn(dto)
	}

	@Protected()
	@Get('@me')
	public async getProfile(@Authorized() user: User) {
		return { user }
	}
}
