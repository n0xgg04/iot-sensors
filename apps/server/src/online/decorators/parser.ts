import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OnlineData = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const payload = ctx.switchToRpc().getData();

  if (typeof payload === 'string') {
    try {
      const parsed = JSON.parse(payload);
      return {
        client_id: parsed.client_id,
        timestamp: new Date(parsed.timestamp ? parseInt(parsed.timestamp) * 1000 : Date.now()),
        status: parsed.status,
      };
    } catch (error) {
      return {
        client_id: '',
        status: '',
        timestamp: new Date(),
      };
    }
  }

  if (typeof payload === 'object' && payload !== null) {
    return {
      client_id: payload.client_id,
      status: payload.status,
      timestamp: new Date(payload.timestamp ? parseInt(payload.timestamp) * 1000 : Date.now()),
    };
  }

  return {
    client_id: '',
    status: '',
    timestamp: new Date(),
  };
});
