import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleRepository } from '../../domain/vehicle.repository';
import { Vehicle } from '../../domain/vehicle.entity';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity';

@Injectable()
export class VehicleRepositoryImpl extends VehicleRepository {
  constructor(
    @InjectRepository(VehicleOrmEntity)
    private readonly repo: Repository<VehicleOrmEntity>,
  ) {
    super();
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const toSave = this.repo.create({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      plateNumber: vehicle.plateNumber,
      ownerId: vehicle.ownerId,
    });
    const saved = await this.repo.save(toSave);
    return new Vehicle(saved.id, saved.make, saved.model, saved.plateNumber, saved.ownerId);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) return null;
    return new Vehicle(found.id, found.make, found.model, found.plateNumber, found.ownerId);
  }

  async findAllByOwner(ownerId: string): Promise<Vehicle[]> {
    const list = await this.repo.find({ where: { ownerId } });
    return list.map(
      v => new Vehicle(v.id, v.make, v.model, v.plateNumber, v.ownerId),
    );
  }

  async update(vehicle: Vehicle): Promise<Vehicle> {
    await this.repo.update(vehicle.id, {
      make: vehicle.make,
      model: vehicle.model,
      plateNumber: vehicle.plateNumber,
      ownerId: vehicle.ownerId,
    });
    const updated = await this.repo.findOne({ where: { id: vehicle.id } });
    if (!updated) throw new Error('Vehicle not found after update');
    return new Vehicle(updated.id, updated.make, updated.model, updated.plateNumber, updated.ownerId);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
