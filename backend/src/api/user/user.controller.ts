import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import {
	EditProfileDto,
	PartialEditProfileDto,
	UserResponseDto
} from 'src/api/user/dto'
import { UserService } from 'src/api/user/user.service'
import { Authorized, Protected } from 'src/common/decorators'

@Controller('users')
@ApiTags('Users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@Protected()
	@Get()
	@ApiOkResponse({ type: [UserResponseDto] })
	public async getUsers(
		@Authorized('userId') userId: string,
		@Query() query: Record<string, string>
	) {
		return await this.userService.findUsers(userId, query)
	}

	@Get(':userId')
	@ApiOkResponse({ type: UserResponseDto })
	public async getUserById(@Param('userId') userId: string) {
		return await this.userService.findUserById(userId)
	}

	@Protected()
	@Patch('edit')
	@ApiCreatedResponse({ type: UserResponseDto })
	@ApiBody({ type: EditProfileDto })
	public async edit(
		@Body() dto: PartialEditProfileDto,
		@Authorized('userId') userId: string
	) {
		return await this.userService.edit(dto, userId)
	}
}
