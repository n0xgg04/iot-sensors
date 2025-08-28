import { Injectable, OnModuleInit, Inject, Logger, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';
import { SensorDataType } from './sensors.type';
import { SensorData } from './decorators/parser';
import { SensorsService } from './sensors.service';

@Controller()
export class SensorsObserver {
  constructor(private readonly sensorsService: SensorsService) {}

  @MessagePattern('esp32/sensors')
  getSensorData(@SensorData() data: SensorDataType, @Ctx() context: MqttContext) {
    this.sensorsService.createSensorData(data);
    return { ack: true };
  }
}
