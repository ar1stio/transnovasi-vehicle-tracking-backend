import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../domain/vehicle.repository';
import { Vehicle } from '../domain/vehicle.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VehicleService {
  constructor(private readonly repo: VehicleRepository) {}

  async create(
    make: string,
    model: string,
    plateNumber: string,
    ownerId: string,
  ): Promise<Vehicle> {
    const id = uuidv4();
    const vehicle = new Vehicle(id, make, model, plateNumber, ownerId);
    return this.repo.create(vehicle);
  }

  async getById(id: string): Promise<Vehicle> {
    const v = await this.repo.findById(id);
    if (!v) throw new Error('Vehicle not found');
    return v;
  }

  async getAll(ownerId: string): Promise<Vehicle[]> {
    return this.repo.findAllByOwner(ownerId);
  }

  async update(
    id: string,
    make: string,
    model: string,
    plateNumber: string,
    ownerId: string,
  ): Promise<Vehicle> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error('Vehicle not found');
    existing.make = make;
    existing.model = model;
    existing.plateNumber = plateNumber;
    existing.ownerId = ownerId;
    return this.repo.update(existing);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
