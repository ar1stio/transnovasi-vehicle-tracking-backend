import { Vehicle } from './vehicle.entity';

export abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<Vehicle>;
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract findAllByOwner(ownerId: string): Promise<Vehicle[]>;
  abstract update(vehicle: Vehicle): Promise<Vehicle>;
  abstract delete(id: string): Promise<void>;
}
