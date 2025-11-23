import { Controller, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { FileResponseDto, FilesResponseDto } from 'src/api/file/dto';



import { FileService } from './file.service';





@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseInterceptors(FilesInterceptor('files'))
	@Post('/:folder/many')
	@ApiCreatedResponse({ type: FilesResponseDto })
	uploadFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@Param('folder') folder: string
	) {
		return this.fileService.uploadFiles(files, folder)
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post(':folder')
	@ApiCreatedResponse({ type: FileResponseDto })
	uploadFile(
		@UploadedFile()
		file: Express.Multer.File,
		@Param('folder') folder: string
	) {
		return this.fileService.upload(file, folder)
	}
}