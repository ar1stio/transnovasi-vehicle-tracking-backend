import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingModule } from './tracking/tracking.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/infrastructure/modules/customer.module';
import { CustomerOrmEntity } from './customer/infrastructure/entities/customer-orm.entity';
// import { Vehicle } from './vehicle/vehicle.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'transnovation',
      entities: [CustomerOrmEntity], // entity kamu di sini
      synchronize: true, // jangan dipakai di production ya
    }),
    // TypeOrmModule.forFeature([Customer]),
    CustomerModule,
    TrackingModule],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
