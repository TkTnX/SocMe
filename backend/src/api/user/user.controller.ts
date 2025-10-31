import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from 'src/api/file/file.service'
import { EditProfileDto, PartialEditProfileDto } from 'src/api/user/dto'
import { UserService } from 'src/api/user/user.service'
import { Authorized, Protected } from 'src/common/decorators'

@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@Protected()
	@Get()
	public async getUsers(
		@Authorized('userId') userId: string,
		@Query('isPeoplePage') isPeoplePage: boolean,
		@Query('query') query: string
	) {
		return await this.userService.findUsers(userId, isPeoplePage, query)
	}

	@Get(':userId')
	public async getUserById(@Param('userId') userId: string) {
		return await this.userService.findUserById(userId)
	}

	@Protected()
	@Patch('edit')
	public async edit(
		@Body() dto: PartialEditProfileDto,
		@Authorized('userId') userId: string
	) {
		return await this.userService.edit(dto, userId)
	}
}
