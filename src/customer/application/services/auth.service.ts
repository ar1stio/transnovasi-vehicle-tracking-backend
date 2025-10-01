import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from '../../domain/customer.repository';
import { Customer } from '../../domain/customer.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const customer = await this.repo.findByEmail(email);
    if (!customer) return null;

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return null;

    const payload = { sub: customer.id, email: customer.email };
    return this.jwtService.signAsync(payload);
  }

  async register(email: string, password: string): Promise<Customer> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const customer = new Customer(id, email, hashedPassword);
    return this.repo.create(customer);
  }
}