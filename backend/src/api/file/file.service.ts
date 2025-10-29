import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FileService {
	public constructor(private readonly configService: ConfigService) {}

	public async uploadFiles(files: Express.Multer.File[], folder: string) {
		const uploadDir = path.join(process.cwd(), 'uploads', folder)
		const urls: string[] = []

		for (let i = 0; i < files.length; i++) {
			const filePath = path.join(uploadDir, files[i].originalname)

			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true })
			}

			fs.writeFileSync(filePath, files[i].buffer)

			const fileUrl = `${this.configService.getOrThrow('HTTP_HOST')}/uploads/${folder}/${files[i].originalname}`

			urls.push(fileUrl)
		}

		return { urls }
	}

	public async upload(file: Express.Multer.File, folder: string) {
		const uploadDir = path.join(process.cwd(), 'uploads', folder)

		const filePath = path.join(uploadDir, file.originalname)

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true })
		}

		fs.writeFileSync(filePath, file.buffer)

		const fileUrl = `${this.configService.getOrThrow('HTTP_HOST')}/uploads/${folder}/${file.originalname}`

		return {
			path: fileUrl
		}
	}
}
