import { Module } from '@nestjs/common';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.server';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DevicesController } from './devices.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DevicesController],
  providers: [DevicesResolver, DevicesService],
  exports: [],
})
export class DevicesModule {}
