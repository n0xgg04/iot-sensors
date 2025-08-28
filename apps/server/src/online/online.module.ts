import { Module } from '@nestjs/common';
import { OnlineService } from './online.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OnlineObserver } from './online.observer';

@Module({
  imports: [PrismaModule],
  controllers: [OnlineObserver],
  providers: [OnlineService],
  exports: [],
})
export class OnlineModule {}
