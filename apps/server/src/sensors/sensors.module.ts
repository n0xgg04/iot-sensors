import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsResolver } from './sensors.resolver';
import { SensorsObserver } from './sensors.observer';
import { WebsocketModule } from '../websocket/websocket.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [WebsocketModule, PrismaModule],
  providers: [SensorsService, SensorsResolver],
  exports: [SensorsService],
  controllers: [SensorsObserver],
})
export class SensorsModule {}
