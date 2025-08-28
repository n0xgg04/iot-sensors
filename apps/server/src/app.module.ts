import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DevicesModule } from './devices/devices.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SensorsModule } from './sensors/sensors.module';
import { OnlineModule } from './online/online.module';
import { WebsocketModule } from './websocket/websocket.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) =>
        Joi.object({
          MQTT_URL: Joi.string().required(),
          MQTT_USERNAME: Joi.string().required(),
          MQTT_PASSWORD: Joi.string().required(),
          MQTT_CLIENT_ID: Joi.string().required(),
          DATABASE_URL: Joi.string().required(),
          REDIS_URL: Joi.string().required(),
        }).validate(config),
    }),

    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [DevicesModule, SensorsModule],
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        return {
          store: await redisStore({ url: config.get('REDIS_URL') }),
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'MQTT_SERVICE',
          useFactory: (configService: ConfigService) => ({
            transport: Transport.MQTT,
            options: {
              url: process.env.MQTT_URL,
              username: process.env.MQTT_USERNAME,
              password: process.env.MQTT_PASSWORD,
              clientId: process.env.MQTT_CLIENT_ID,
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
    WebsocketModule,
    DevicesModule,
    SensorsModule,
    OnlineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
