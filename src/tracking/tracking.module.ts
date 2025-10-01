import { Module } from '@nestjs/common';
import { StartTrackingUseCase } from './application/use-cases/start-tracking.usecase';
import { UpdateLocationUseCase } from './application/use-cases/update-location.usecase';
import { TrackingController } from './interfaces/controllers/tracking.controller';
import { LocationGateway } from './interfaces/gateways/location.gateway';
// import { InMemorySessionAdapter } from './infrastructure/memory/in-memory-session.adapter';
import { RedisSessionAdapter } from './infrastructure/redis/redis-session.adapter';
import { RedisModule } from './infrastructure/redis/redis.module'; 

@Module({
  imports: [RedisModule],
  controllers: [TrackingController],
  providers: [
    StartTrackingUseCase,
    UpdateLocationUseCase,
    // InMemorySessionAdapter,
    RedisSessionAdapter,
    LocationGateway,
    {
      provide: 'SessionPort',
      useClass: RedisSessionAdapter,
    //   useClass: InMemorySessionAdapter,
    },
    {
      provide: 'WebSocketPort',
      useClass: LocationGateway,
    },
    {
      provide: 'LocationPort',
      useValue: {
        saveLocation: async () => {}, // dummy until Redis adapter added
      },
    },
  ],
})
export class TrackingModule {}
