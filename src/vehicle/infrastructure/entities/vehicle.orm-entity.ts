import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vehicles')
export class VehicleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ unique: true })
  plateNumber: string;

  @Column()
  ownerId: string;
}
