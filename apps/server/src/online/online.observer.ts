import { Controller, Get } from '@nestjs/common';
import { OnlineService } from './online.service';
import { MessagePattern } from '@nestjs/microservices';
import { OnlineData } from './decorators/parser';

@Controller('online')
export class OnlineObserver {
  constructor(private readonly onlineService: OnlineService) {}

  @MessagePattern('esp32/check_online')
  async handleCheckOnline(@OnlineData() onlineData: any) {
    return this.onlineService.setOnlineData();
  }

  @Get('')
  async getOnlineData() {
    return this.onlineService.getOnlineData();
  }
}
