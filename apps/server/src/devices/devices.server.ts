import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { DEVICES } from './devices.enum';
import { ACTIONS } from './devices.enum';
import { map } from 'rxjs';
import { AddDevicePayload } from './devices.type';
import { DeviceActionType, DeviceStatus } from '@prisma/client';

const ACTION_TOPIC = 'esp32/actions';

@Injectable()
export class DevicesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async controlDevice(device_id: string, action: ACTIONS) {
    const device = await this.prisma.device.findFirst({
      where: {
        OR: [{ id: device_id }, { sensor_id: device_id }],
      },
      include: {
        status: true,
      },
    });
    const status = device.status.status;
    if (!device) {
      throw new NotFoundException('Device not found');
    }
    return Promise.all([
      this.mqttClient
        .emit(ACTION_TOPIC, { action: action.toLowerCase(), relay: device.sensor_id })
        .pipe(map((response) => response.data)),
      this.prisma.$transaction(async (tx) => {
        await Promise.all([
          tx.device.update({
            where: { id: device.id },
            data: { status: { update: { status: action.toLowerCase() as DeviceStatus } } },
          }),
          tx.devicesActionLog.create({
            data: {
              device: {
                connect: {
                  id: device.id,
                },
              },
              status_before: status,
              status_after: action.toLowerCase() as DeviceStatus,
              user: {
                connect: {
                  id: '1',
                },
              },
              is_executing: true,
              action: (() => {
                switch (action) {
                  case ACTIONS.ON:
                    return DeviceActionType.switch_on;
                  case ACTIONS.OFF:
                    return DeviceActionType.switch_off;
                }
              })(),
            },
          }),
        ]);
      }),
    ]);
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
