import { Location } from '../value-objects/location.vo';

export interface LocationPort {
  saveLocation(sessionId: string, location: Location): Promise<void>;
}