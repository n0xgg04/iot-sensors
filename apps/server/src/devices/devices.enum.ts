import { registerEnumType } from '@nestjs/graphql';

export enum DEVICES {
  FAN = 'RELAY_TEMP',
  AIR_CONDITIONER = 'RELAY_HUMI',
  LIGHT = 'RELAY_LIGHT',
}

export enum ACTIONS {
  ON = 'ON',
  OFF = 'OFF',
}

registerEnumType(DEVICES, {
  name: 'DEVICES',
});

registerEnumType(ACTIONS, {
  name: 'ACTIONS',
});
