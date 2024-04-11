import { ThrottlerModule } from '@nestjs/throttler';

import { rateLimitingConfig } from './constants/rate-limiting.constant';

export const RateLimitingModule = ThrottlerModule.forRoot({
  throttlers: [
    {
      ttl: rateLimitingConfig.ttl,
      limit: rateLimitingConfig.limit,
    },
  ],
});
