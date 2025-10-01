import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  make: string;

  @ApiProperty({ example: 'Avanza Veloz' })
  model: string;

  @ApiProperty({ example: 'B1234XYZ' })
  plateNumber: string;
}
