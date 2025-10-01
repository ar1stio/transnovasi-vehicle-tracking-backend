import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity';
import { VehicleRepositoryImpl } from '../repositories/vehicle.repository.impl';
import { VehicleService } from '../../application/vehicle.service';
import { VehicleController } from '../controllers/vehicle.controller';
import { AuthJwtModule } from '../../../auth/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleOrmEntity]), AuthJwtModule],
  controllers: [VehicleController],
  providers: [
    {
      provide: 'VehicleRepository',
      useClass: VehicleRepositoryImpl,
    },
    {
      provide: VehicleService,
      useFactory: (repo) => new VehicleService(repo),
      inject: ['VehicleRepository'],
    },
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
