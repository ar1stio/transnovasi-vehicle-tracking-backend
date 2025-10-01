import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = new Redis();

        client.on('connect', () => {
          console.log('Redis connected!');
        });

        client.on('error', (err) => {
          console.error('Redis connection error:', err);
        });

        // Optionally: tunggu sampai ready (connected)
        await new Promise((resolve, reject) => {
          client.once('ready', resolve);
          client.once('error', reject);
        });

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
