import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  make: string;

  @ApiProperty({ example: 'Avanza' })
  model: string;

  @ApiProperty({ example: 'B1234XYZ' })
  plateNumber: string;
}
