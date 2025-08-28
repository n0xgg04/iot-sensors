import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { DevicesService } from './devices.server';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getDevices() {
    return this.devicesService.getDevices();
  }

  @MessagePattern('esp32/action_response')
  async handleActionResponse(@Ctx() context: MqttContext) {
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
