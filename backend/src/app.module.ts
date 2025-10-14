import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configServiceConfig } from 'src/configs'
import { PrismaModule } from './api/prisma/prisma.module';
import { PostModule } from './api/post/post.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

@Module({
	imports: [ConfigModule.forRoot(configServiceConfig), PrismaModule, PostModule, AuthModule, UserModule]
})
export class AppModule {}
