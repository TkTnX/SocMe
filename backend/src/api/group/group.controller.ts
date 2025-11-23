import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EditGroupDto, GroupDto, GroupResponseDto, PartialEditGroupDto } from 'src/api/group/dto';
import { Authorized, Protected } from 'src/common/decorators';



import { GroupService } from './group.service';





@Controller('groups')
@ApiTags('Groups')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Get()
	@ApiOkResponse({ type: [GroupResponseDto] })
	public async getGroups(@Query() query?: Record<string, string>) {
		return await this.groupService.getGroups(query)
	}

	@Get(':groupId')
	@ApiOkResponse({ type: GroupResponseDto })
	public async getGroupById(@Param('groupId') groupId: string) {
		return await this.groupService.getGroupById(groupId)
	}

	@Protected()
	@Post()
	@ApiCreatedResponse({ type: GroupResponseDto })
	@ApiBody({ type: GroupDto })
	public async createGroup(
		@Body() dto: GroupDto,
		@Authorized('userId') userId: string
	) {
		return await this.groupService.createGroups(dto, userId)
	}

	@Protected()
	@Patch(':groupId')
	@ApiCreatedResponse({ type: GroupResponseDto })
	@ApiBody({ type: EditGroupDto })
	public async editGroup(
		@Param('groupId') groupId: string,
		@Body() dto: PartialEditGroupDto,
		@Authorized('userId') userId: string
	) {
		return await this.groupService.editGroup(groupId, dto, userId)
	}

	@Protected()
	@Delete(':groupId')
	@ApiOkResponse({ type: GroupResponseDto })
	public async deleteGroup(
		@Param('groupId') groupId: string,
		@Authorized('userId') userId: string
	) {
		return await this.groupService.deleteGroup(groupId, userId)
	}
}