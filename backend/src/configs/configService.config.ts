import { ConfigModuleOptions } from '@nestjs/config'

export const configServiceConfig: ConfigModuleOptions = {
	envFilePath: ['.env'],
	isGlobal: true
}
