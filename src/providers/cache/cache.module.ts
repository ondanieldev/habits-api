import { Module } from '@nestjs/common';

import { CacheRedisService } from './services/cache-redis.service';
import { CacheService } from './services/cache.service';

@Module({
  exports: [CacheService],
  providers: [
    {
      provide: CacheService,
      useClass: CacheRedisService,
    },
  ],
})
export class CacheModule {}
