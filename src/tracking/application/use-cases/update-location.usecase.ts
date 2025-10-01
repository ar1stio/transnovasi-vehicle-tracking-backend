import { Injectable, Inject } from '@nestjs/common';
import type { LocationPort } from '../../domain/ports/location.port';
import type{ SessionPort } from '../../domain/ports/session.port';
import  type { WebSocketPort } from '../../domain/ports/websocket.port';
import { Location } from '../../domain/value-objects/location.vo';

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject('LocationPort') private readonly locationPort: LocationPort,
    @Inject('SessionPort') private readonly sessionPort: SessionPort,
    @Inject('WebSocketPort') private readonly wsPort: WebSocketPort,
  ) {}

  async execute(vehicleId: string, location: Location): Promise<void> {
    const session = await this.sessionPort.getActiveSession(vehicleId);
    if (!session || !session.isActive()) throw new Error('No active session');

    await this.locationPort.saveLocation(session.sessionId, location);
    await this.wsPort.broadcastLocation(vehicleId, location);
  }
}
