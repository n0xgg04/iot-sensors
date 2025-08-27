import { AddDevicePayload, Device } from './devices.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DevicesService } from './devices.server';
import { ACTIONS, DEVICES } from './devices.enum';

@Resolver()
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Query(() => [Device])
  async devices() {
    return this.devicesService.getDevices();
  }

  @Mutation(() => Boolean)
  async addDevices(@Args('device', { type: () => AddDevicePayload }) device: AddDevicePayload) {
    try {
      await this.devicesService.addDevice(device);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async controlDevice(
    @Args('device_id', { type: () => String }) device_id: string,
    @Args('action', { type: () => ACTIONS }) action: ACTIONS,
  ) {
    try {
      await this.devicesService.controlDevice(device_id, action);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
