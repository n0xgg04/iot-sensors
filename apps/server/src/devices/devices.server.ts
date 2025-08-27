import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { DEVICES } from './devices.enum';
import { ACTIONS } from './devices.enum';
import { map } from 'rxjs';

const ACTION_TOPIC = 'esp32/actions';

@Injectable()
export class DevicesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async controlDevice(device: DEVICES, action: ACTIONS) {
    console.log('emitting', { action: action.toLowerCase(), relay: device });
    return this.mqttClient
      .emit(ACTION_TOPIC, { action: action.toLowerCase(), relay: device })
      .pipe(map((response) => response.data));
  }
}
