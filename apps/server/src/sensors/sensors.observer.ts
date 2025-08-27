import { Injectable, OnModuleInit, Inject, Logger, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller()
export class SensorsObserver {
  @MessagePattern('esp32/sensors')
  getSensorData(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log('Received MQTT message:', data);
    console.log('Topic:', context.getTopic());
    return { ack: true };
  }
}
