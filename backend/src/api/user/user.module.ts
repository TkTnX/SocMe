import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { FileService } from 'src/api/file/file.service'

@Module({
	controllers: [UserController],
	providers: [UserService,FileService],
	exports: [UserService],
})
export class UserModule {}
