import { Query, Resolver, Args } from '@nestjs/graphql';
import { SensorsService } from './sensors.service';
import { SensorDataType } from './sensors.type';

@Resolver()
export class SensorsResolver {
  constructor(private readonly sensorsService: SensorsService) {}

  @Query(() => [SensorDataType])
  async getSensorData(
    @Args('from', { type: () => Date, defaultValue: new Date(Date.now() - 24 * 60 * 60 * 1000) }) from: Date,
    @Args('to', { type: () => Date, defaultValue: new Date() }) to: Date,
  ) {
    try {
      if (!from || !to) {
        throw new Error('Both from and to dates are required');
      }

      if (from > to) {
        throw new Error('From date must be before to date');
      }

      const result = await this.sensorsService.getAllSensorData(from, to);
      return result || [];
    } catch (error) {
      console.error('Error in getSensorData resolver:', error);
      return [];
    }
  }
}
