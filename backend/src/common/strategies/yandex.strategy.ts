import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
	constructor() {
		super({
			clientID: process.env.YANDEX_CLIENT_ID!,
			clientSecret: process.env.YANDEX_CLIENT_SECRET!,
			callbackURL: process.env.YANDEX_CALLBACK_URL!
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: any) {
		return {
			id: profile.id,
			email: profile.emails?.[0]?.value,
			name: `${profile.name?.givenName} ${profile.name?.familyName}`,
			avatar: profile.photos[0].value
		}
	}
}
