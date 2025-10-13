import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configServiceConfig } from 'src/configs'
import { PrismaModule } from './api/prisma/prisma.module';

@Module({
	imports: [ConfigModule.forRoot(configServiceConfig), PrismaModule]
})
export class AppModule {}
