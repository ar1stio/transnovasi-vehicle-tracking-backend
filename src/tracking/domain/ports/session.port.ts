import { TrackingSession } from '../entities/tracking-session.entity';

export interface SessionPort {
  getActiveSession(vehicleId: string): Promise<TrackingSession | null>;
  startSession(vehicleId: string): Promise<TrackingSession>;
  stopSession(vehicleId: string): Promise<void>;
}
