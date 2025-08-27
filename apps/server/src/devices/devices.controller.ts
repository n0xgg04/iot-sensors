import { Controller, Get } from '@nestjs/common';
import { DevicesService } from './devices.server';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getDevices() {
    return this.devicesService.getDevices();
  }
}
