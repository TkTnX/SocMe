import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Request,
	Res,
	UseGuards,
	Response
} from '@nestjs/common'
import { Request as ExpressRequest, Response as ResponseType } from 'express'
import { SignInDto, SignUpDto } from 'src/api/auth/dto'
import { Authorized, Protected } from 'src/common/decorators'
import { GoogleOAuthGuard } from 'src/common/guards/google-oauth.guard'
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
	public async refresh(@Req() req: ExpressRequest) {
		return await this.authService.refresh(req)
	}

	@Protected()
	@Get('@me')
	public async getProfile(@Authorized() user: IPayload) {
		return await this.authService.getMe(user)
	}

	@Get('google')
	@UseGuards(GoogleOAuthGuard)
	public async googleAuth() {
		console.log("GET")
	}

	@Get('callback/google')
	@UseGuards(GoogleOAuthGuard)
	public async googleAuthRedirect(@Req() req: ExpressRequest, @Res() res: ResponseType) {


		return this.authService.googleLogin(req, res)
	}

	@Protected()
	@Post('logout')
	public async logout(@Res({passthrough: true}) res: ResponseType) {
		return await this.authService.logout(res)
	}
}
