import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { getCorsConfig } from 'src/configs'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)

	app.enableCors(getCorsConfig(config))
	app.useGlobalPipes(new ValidationPipe())

	const port = config.getOrThrow('HTTP_PORT')
	const host = config.getOrThrow('HTTP_HOST')
	try {
		await app.listen(port)

		logger.log(`Сервер успешно запущен! ${host}`)
	} catch (error) {
		logger.error('Произошла ошибка при запуске сервера: ', error)
		process.exit(1)
	}
}
bootstrap()
