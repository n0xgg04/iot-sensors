import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SensorDataType } from './sensors.type';

@Injectable()
export class SensorsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSensorData(data: SensorDataType) {
    return this.prisma.sensorData.create({
      data: {
        data: {},
        temperature: data.temperature,
        humidity: data.humidity,
        light: data.lux,
        created_at: data.timestamp,
      },
    });
  }
}
