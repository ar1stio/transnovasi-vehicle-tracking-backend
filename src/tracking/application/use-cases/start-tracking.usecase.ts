import { Injectable, Inject } from '@nestjs/common';
import type { SessionPort } from '../../domain/ports/session.port';

@Injectable()
export class StartTrackingUseCase {
  constructor(@Inject('SessionPort') private sessionPort: SessionPort) {}

  async execute(vehicleId: string) {
    return this.sessionPort.startSession(vehicleId);
  }

  async stop(vehicleId: string) {
    return this.sessionPort.stopSession(vehicleId);
  }
}
