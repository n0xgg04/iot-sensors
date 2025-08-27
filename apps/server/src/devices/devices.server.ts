import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { DEVICES } from './devices.enum';
import { ACTIONS } from './devices.enum';
import { map } from 'rxjs';
import { AddDevicePayload } from './devices.type';
import { DeviceStatus } from '@prisma/client';

const ACTION_TOPIC = 'esp32/actions';

@Injectable()
export class DevicesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async controlDevice(device_id: string, action: ACTIONS) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: device_id,
      },
    });
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return this.mqttClient
      .emit(ACTION_TOPIC, { action: action.toLowerCase(), relay: device.sensor_id })
      .pipe(map((response) => response.data));
  }

  async addDevice(device: AddDevicePayload) {
    return this.prisma.device.create({
      data: {
        ...device,
        status: {
          create: {
            status: DeviceStatus.off,
          },
        },
      },
    });
  }

  async getDevices() {
    return this.prisma.device
      .findMany({
        select: {
          id: true,
          name: true,
          location: true,
          sensor_id: true,
          port: true,
          status: {
            select: {
              status: true,
              updated_at: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      })
      .then((devices) => {
        return devices.map((device) => {
          return {
            ...device,
            status: device.status?.status || DeviceStatus.off,
          };
        });
      });
  }
}
