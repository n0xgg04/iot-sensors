import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SensorDataInput, SensorDataType } from './sensors.type';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class SensorsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createSensorData(data: SensorDataInput) {
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

  async getAllSensorData(from: Date, to: Date): Promise<SensorDataType[]> {
    try {
      const rawData = await this.prisma.sensorData.findMany({
        where: {
          created_at: { gte: from, lte: to },
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      return rawData.map((item) => ({
        temperature: item.temperature !== null ? Number(item.temperature) : 0,
        humidity: item.humidity !== null ? Number(item.humidity) : 0,
        lux: item.light !== null ? Number(item.light) : 0,
        timestamp: item.created_at,
      }));
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      return [];
    }
  }
}
