import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsObserver } from './sensors.observer';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SensorsService],
  exports: [],
  controllers: [SensorsObserver],
})
export class SensorsModule {}
