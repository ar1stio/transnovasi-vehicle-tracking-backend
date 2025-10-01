import { Controller, Request, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VehicleService } from '../../application/vehicle.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('vehicles')
@Controller('vehicles')
@UseGuards(AuthGuard('jwt'))
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Create new vehicle' })
  @ApiResponse({ status: 201, description: 'Vehicle created' })
  async create(@Request() req, @Body() body: { make: string; model: string; plateNumber: string }) {
    const customer = req.user; // JWT payload
    return this.vehicleService.create(body.make, body.model, body.plateNumber, customer.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles for current customer' })
  async findAll(@Request() req) {
    const customer = req.user;
    return this.vehicleService.getAll(customer.id);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    const customer = req.user;
    const vehicle = await this.vehicleService.getById(id);
    if (vehicle.ownerId !== customer.id) {
      throw new Error('Not allowed');
    }
    return vehicle;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update vehicle' })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() body: { make: string; model: string; plateNumber: string },
  ) {
    const customer = req.user;
    const vehicle = await this.vehicleService.getById(id);
    if (vehicle.ownerId !== customer.id) {
      throw new Error('Not allowed');
    }
    return this.vehicleService.update(id, body.make, body.model, body.plateNumber, customer.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vehicle' })
  async remove(@Param('id') id: string, @Request() req) {
    const customer = req.user;
    const vehicle = await this.vehicleService.getById(id);
    if (vehicle.ownerId !== customer.id) {
      throw new Error('Not allowed');
    }
    await this.vehicleService.delete(id);
    return { success: true };
  }
}
