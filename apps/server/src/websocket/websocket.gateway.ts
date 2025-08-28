import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  namespace: '/',
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketGateway.name);
  private isInitialized = false;

  onModuleInit() {
    this.logger.log('WebSocket Gateway module initialized');
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway afterInit called');
    this.isInitialized = true;
    this.logger.log(`WebSocket Gateway initialized successfully on port ${process.env.PORT || 3000}`);
  }

  private getClientCount(): number {
    try {
      if (this.server && this.server.sockets && this.server.sockets.sockets) {
        return this.server.sockets.sockets.size;
      }
      return 0;
    } catch (error) {
      this.logger.error('Error getting client count:', error);
      return 0;
    }
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    if (this.isInitialized) {
      const clientCount = this.getClientCount();
      this.logger.log(`Total clients connected: ${clientCount}`);
    } else {
      this.logger.log('Server not fully initialized yet, client connected');
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    if (this.isInitialized) {
      const clientCount = this.getClientCount();
      this.logger.log(`Total clients connected: ${clientCount}`);
    } else {
      this.logger.log('Server not fully initialized yet, client disconnected');
    }
  }

  broadcastSensorData(data: any) {
    if (!this.isInitialized) {
      this.logger.error('WebSocket Gateway not yet initialized');
      return;
    }

    if (!this.server) {
      this.logger.error('WebSocket server not available');
      return;
    }

    const clientCount = this.getClientCount();
    this.logger.log(`Broadcasting sensor data to ${clientCount} clients`);

    try {
      this.server.emit('sensor-data', data);
      this.logger.log('Sensor data broadcasted successfully');
    } catch (error) {
      this.logger.error('Error broadcasting sensor data:', error);
    }
  }
}
