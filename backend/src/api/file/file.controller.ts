import {
	Controller,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseInterceptors(FileInterceptor('file'))
	@Post(':folder')
	uploadFile(
		@UploadedFile()
		file: Express.Multer.File,
		@Param('folder') folder: string
	) {
		return this.fileService.upload(file, folder)
	}
}
