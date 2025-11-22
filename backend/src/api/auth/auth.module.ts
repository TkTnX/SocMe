import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserService } from 'src/api/user/user.service'
import { GoogleStrategy, JwtStrategy } from 'src/common/strategies'
import { getJwtConfig } from 'src/configs'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getJwtConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, JwtStrategy, GoogleStrategy],
	exports: [JwtModule]
})
export class AuthModule {}
