import { Module } from '@nestjs/common';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.server';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [DevicesResolver, DevicesService],
  exports: [],
})
export class DevicesModule {}
