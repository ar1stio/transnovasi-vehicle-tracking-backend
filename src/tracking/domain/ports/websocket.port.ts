import { Location } from '../value-objects/location.vo';

export interface WebSocketPort {
  broadcastLocation(vehicleId: string, location: Location): Promise<void>;
}
