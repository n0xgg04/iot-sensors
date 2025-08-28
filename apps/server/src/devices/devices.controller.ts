import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { DevicesService } from './devices.server';
import { OnlineData } from '../online/decorators/parser';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getDevices() {
    return this.devicesService.getDevices();
  }

  @MessagePattern('esp32/action_responses')
  async handleActionResponse(@Payload() onlineData: any, @Ctx() context: MqttContext) {
    const payload = context.getPacket().payload;
    console.log('Received action response:', payload);

    try {
      const data = JSON.parse(payload.toString());
      const { action_id, relay, status } = data;

      if (status === 'success' && action_id) {
        await this.devicesService.updateActionLogStatus(action_id);
      }
    } catch (error) {}

    return { ack: true };
  }
}
