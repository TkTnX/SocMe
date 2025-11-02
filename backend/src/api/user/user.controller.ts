import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { PartialEditProfileDto } from 'src/api/user/dto'
import { UserService } from 'src/api/user/user.service'
import { Authorized, Protected } from 'src/common/decorators'

@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@Protected()
	@Get()
	public async getUsers(
		@Authorized('userId') userId: string,
		@Query() query
	) {
		return await this.userService.findUsers(userId, query)
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
