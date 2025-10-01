import { SessionPort } from '../../domain/ports/session.port';
import { TrackingSession } from '../../domain/entities/tracking-session.entity';
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';

@Injectable()
export class RedisSessionAdapter implements SessionPort {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  private key(vehicleId: string): string {
    return `tracking:session:${vehicleId}`;
  }

  async startSession(vehicleId: string): Promise<TrackingSession> {
    const session = new TrackingSession(randomUUID(), vehicleId, new Date());

    await this.redis.set(
      this.key(vehicleId),
      JSON.stringify(session),
    );

    return session;
  }

  async stopSession(vehicleId: string): Promise<void> {
    const data = await this.redis.get(this.key(vehicleId));
    if (!data) return;

    const session = TrackingSession.fromJSON(JSON.parse(data));
    session.stop();

    await this.redis.set(this.key(vehicleId), JSON.stringify(session));
  }

  async getActiveSession(vehicleId: string): Promise<TrackingSession | null> {
    const data = await this.redis.get(this.key(vehicleId));
    if (!data) return null;

    const session = TrackingSession.fromJSON(JSON.parse(data));
    return session.isActive() ? session : null;
  }
}