import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StartTrackingUseCase } from '../../application/use-cases/start-tracking.usecase';
import { UpdateLocationUseCase } from '../../application/use-cases/update-location.usecase';
import { Location } from '../../domain/value-objects/location.vo';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly startTracking: StartTrackingUseCase,
    private readonly updateLocation: UpdateLocationUseCase,
  ) {}

  @Post('start')
  async start(@Body() body: { vehicleId: string }, @Request() req) {
    return this.startTracking.execute(body.vehicleId);
  }

  @Post('stop')
  async stop(@Body() body: { vehicleId: string }, @Request() req) {
    return this.startTracking.stop(body.vehicleId);
  }

  @Post('location')
  async updateLocationEndpoint(@Body() body: { vehicleId: string, lat: number, lng: number }, @Request() req) {
    const location = new Location(body.vehicleId, body.lat, body.lng);
    await this.updateLocation.execute(body.vehicleId, location);
    return { status: 'ok' };
  }
}
