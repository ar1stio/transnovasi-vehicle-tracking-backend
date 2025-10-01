import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from '../entities/customer-orm.entity';
import { CustomerRepositoryImpl } from '../repositories/customer.repository.impl';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../application/services/auth.service';
import { AuthJwtModule } from 'src/auth/jwt.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity]), AuthJwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'CustomerRepository',
      useClass: CustomerRepositoryImpl,
    },
    {
      provide: AuthService,
      useFactory: (repo, jwt) => new AuthService(repo, jwt),
      inject: ['CustomerRepository', JwtService],
    },
  ],
})
export class CustomerModule {}
