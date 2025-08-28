import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SensorData = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const payload = ctx.switchToRpc().getData();

  if (typeof payload === 'string') {
    try {
      const parsed = JSON.parse(payload);
      return {
        temperature: parseFloat(parsed.temperature) || 0,
        humidity: parseFloat(parsed.humidity) || 0,
        lux: parseFloat(parsed.lux) || 0,
        timestamp: new Date(parsed.timestamp ? parseInt(parsed.timestamp) * 1000 : Date.now()),
      };
    } catch (error) {
      return {
        temperature: 0,
        humidity: 0,
        lux: 0,
        timestamp: new Date(),
      };
    }
  }

  if (typeof payload === 'object' && payload !== null) {
    return {
      temperature: parseFloat(payload.temperature) || 0,
      humidity: parseFloat(payload.humidity) || 0,
      lux: parseFloat(payload.lux) || 0,
      timestamp: new Date(payload.timestamp ? parseInt(payload.timestamp) * 1000 : Date.now()),
    };
  }

  return {
    temperature: 0,
    humidity: 0,
    lux: 0,
    timestamp: new Date(),
  };
});
