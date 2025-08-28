import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    logger.log('Connecting to MQTT broker...');
    logger.log(`MQTT URL: ${process.env.MQTT_URL}`);
    logger.log(`MQTT Client ID: ${process.env.MQTT_CLIENT_ID}`);

    const microservice = app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.MQTT,
      options: {
        url: process.env.MQTT_URL,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        clientId: process.env.MQTT_CLIENT_ID,
      },
    });

    logger.log('Starting all microservices...');
    await app.startAllMicroservices();
    logger.log('✅ MQTT microservice started successfully');

    await app.init();
    logger.log('✅ App initialized');

    await app.listen(process.env.PORT || 3000);
    logger.log(`🚀 HTTP Server running on port ${process.env.PORT || 3000}`);
    logger.log('🔌 MQTT listener is active and waiting for messages...');
  } catch (error) {
    logger.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('Bootstrap failed:', error);
  process.exit(1);
});
