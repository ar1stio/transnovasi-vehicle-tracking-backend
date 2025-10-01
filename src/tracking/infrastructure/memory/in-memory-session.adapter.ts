import { SessionPort } from '../../domain/ports/session.port';
import { TrackingSession } from '../../domain/entities/tracking-session.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemorySessionAdapter implements SessionPort {
  private sessions = new Map<string, TrackingSession>();

  async startSession(vehicleId: string): Promise<TrackingSession> {
    const session = new TrackingSession(randomUUID(), vehicleId, new Date());
    this.sessions.set(vehicleId, session);
    return session;
  }

  async stopSession(vehicleId: string): Promise<void> {
    const session = this.sessions.get(vehicleId);
    if (session) session.stop();
  }

  async getActiveSession(vehicleId: string): Promise<TrackingSession | null> {
    const session = this.sessions.get(vehicleId);
    return session?.isActive() ? session : null;
  }
}
