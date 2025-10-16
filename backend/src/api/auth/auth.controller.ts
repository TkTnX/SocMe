import { Body, Controller, Get, HttpCode, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { User } from 'generated/prisma';
import { SignInDto, SignUpDto } from 'src/api/auth/dto';
import { Authorized, Protected } from 'src/common/decorators';



import { AuthService } from './auth.service';
import { IPayload } from 'src/common/types';





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

	@Protected()
	@Get('@me')
	public async getProfile(@Authorized() user: IPayload) {
		return await this.authService.getMe(user)
	}
}