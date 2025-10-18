import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	Response
} from '@nestjs/common'
import { Request, Response as ResponseType } from 'express'
import { User } from 'generated/prisma'
import { SignInDto, SignUpDto } from 'src/api/auth/dto'
import { Authorized, Protected } from 'src/common/decorators'
import { IPayload } from 'src/common/types'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('sign-up')
	public async signUp(
		@Response({ passthrough: true }) res: ResponseType,
		@Body() dto: SignUpDto
	) {
		return await this.authService.signUp(res, dto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	public async signIn(
		@Response({ passthrough: true }) res: ResponseType,
		@Body() dto: SignInDto
	) {
		return await this.authService.signIn(res, dto)
	}

	@Get('refresh')
	public async refresh(@Req() req: Request) {
		return await this.authService.refresh(req)
	}

	@Protected()
	@Get('@me')
	public async getProfile(@Authorized() user: IPayload) {
		return await this.authService.getMe(user)
	}
}
