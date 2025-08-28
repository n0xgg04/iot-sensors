import { Injectable, OnModuleInit, Inject, Logger, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { SensorDataInput } from './sensors.type';
import { SensorData } from './decorators/parser';
import { SensorsService } from './sensors.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Controller()
export class SensorsObserver {
  constructor(
    private readonly sensorsService: SensorsService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @MessagePattern('esp32/sensors')
  getSensorData(@SensorData() data: SensorDataInput, @Ctx() context: MqttContext) {
    this.sensorsService.createSensorData(data);
    console.log(data);

    this.websocketGateway.broadcastSensorData({
      topic: 'esp32/sensors',
      payload: data,
      timestamp: new Date(),
    });

    return { ack: true };
  }
}
