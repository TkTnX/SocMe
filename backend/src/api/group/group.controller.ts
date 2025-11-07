import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { GroupDto, PartialEditGroupDto } from 'src/api/group/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { GroupService } from './group.service'

@Controller('groups')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Get()
	public async getGroups(@Query() query?: Record<string, string>) {
		return await this.groupService.getGroups(query)
	}

	@Get(':groupId')
	public async getGroupById(@Param('groupId') groupId: string) {
		return await this.groupService.getGroupById(groupId)
	}

	@Protected()
	@Post()
	public async createGroup(
		@Body() dto: GroupDto,
		@Authorized('userId') userId: string
	) {
		return await this.groupService.createGroups(dto, userId)
	}

	

	@Protected()
	@Patch(':groupId')
	public async editGroup(
		@Param("groupId") groupId: string,
		@Body() dto: PartialEditGroupDto,
		@Authorized("userId") userId:string
	) {
		return await this.groupService.editGroup(groupId, dto, userId)
	}

	@Protected()
	@Delete(':groupId')
	public async deleteGroup(@Param('groupId') groupId: string) {
		return await this.groupService.deleteGroup(groupId)
	}
}
