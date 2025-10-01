import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Location } from '../../domain/value-objects/location.vo';
import { WebSocketPort } from '../../domain/ports/websocket.port';

@WebSocketGateway({ cors: true })
@Injectable()
export class LocationGateway implements OnGatewayConnection, WebSocketPort {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('join-vehicle')
  handleJoinRoom(client: Socket, payload: { vehicleId: string }) {
    client.join(`vehicle-${payload.vehicleId}`);
  }

  async broadcastLocation(vehicleId: string, location: Location) {
    this.server.to(`vehicle-${vehicleId}`).emit('location-update', location);
  }
}
