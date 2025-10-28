import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join } from 'path'
import { getCorsConfig } from 'src/configs'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)

	app.enableCors(getCorsConfig(config))
	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser())
	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

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
