import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerOrmEntity } from '../entities/customer-orm.entity';
import { CustomerRepository } from 'src/customer/domain/customer.repository';
import { Customer } from 'src/customer/domain/customer.entity';

@Injectable()
export class CustomerRepositoryImpl extends CustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly repo: Repository<CustomerOrmEntity>,
  ) {
    super();
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const record = await this.repo.findOne({ where: { email } });
    if (!record) return null;
    return new Customer(record.id, record.email, record.password);
  }

  async create(customer: Customer): Promise<Customer> {
    const saved = await this.repo.save(customer);
    return new Customer(saved.id, saved.email, saved.password);
  }
}
