import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	Response,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { AuthResponseDto, SignInDto, SignUpDto } from 'src/api/auth/dto'
import { UserResponseDto } from 'src/api/user/dto'
import { Authorized, Protected } from 'src/common/decorators'
import { GoogleOAuthGuard } from 'src/common/guards/google-oauth.guard'
import { IPayload } from 'src/common/types'

import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('sign-up')
	@ApiCreatedResponse({ type: AuthResponseDto })
	public async signUp(
		@Response({ passthrough: true }) res: ExpressResponse,
		@Body() dto: SignUpDto
	) {
		return await this.authService.signUp(res, dto)
	}

	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	@ApiCreatedResponse({ type: AuthResponseDto })
	public async signIn(
		@Response({ passthrough: true }) res: ExpressResponse,
		@Body() dto: SignInDto
	) {
		return await this.authService.signIn(res, dto)
	}

	@Get('refresh')
	@ApiCreatedResponse({ type: AuthResponseDto })
	public async refresh(@Req() req: ExpressRequest) {
		return await this.authService.refresh(req)
	}

	@Protected()
	@Get('@me')
	@ApiCreatedResponse({ type: UserResponseDto })
	public async getProfile(@Authorized() user: IPayload) {
		return await this.authService.getMe(user)
	}

	@Get('google')
	@UseGuards(GoogleOAuthGuard)
	public async googleAuth() {
		console.log('GET')
	}

	@Get('callback/google')
	@UseGuards(GoogleOAuthGuard)
	public async googleAuthRedirect(
		@Req() req: ExpressRequest,
		@Res() res: ExpressResponse
	) {
		return this.authService.googleLogin(req, res)
	}

	@Get('yandex')
	@UseGuards(AuthGuard('yandex'))
	public async yandexAuth() {
		console.log('GET')
	}

	@Get('callback/yandex')
	@UseGuards(AuthGuard('yandex'))
	public async yandexCallback(
		@Req() req: ExpressRequest,
		@Res() res: ExpressResponse
	) {
		return this.authService.yandexLogin(req, res)
	}

	@Protected()
	@Post('logout')
	public async logout(@Res({ passthrough: true }) res: ExpressResponse) {
		return await this.authService.logout(res)
	}
}
