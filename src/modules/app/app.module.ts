import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { ClassSerializerInterceptor } from 'common/interceptors/class-serializer.interceptor';

import { CacheModule } from 'providers/cache/cache.module';
import { HashModule } from 'providers/hash/hash.module';
import { MongodbModule } from 'providers/mongodb/mongodb.module';

import { AuthModule } from '../auth/auth.module';
import { RateLimitingGuard } from '../rate-limiting/guards/rate-limiting.guard';
import { RateLimitingModule } from '../rate-limiting/rate-limiting.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    AuthModule,
    CacheModule,
    HashModule,
    MongodbModule,
    RateLimitingModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitingGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}