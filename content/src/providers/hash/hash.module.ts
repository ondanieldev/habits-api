import { Module } from '@nestjs/common';

import { HashArgon2Service } from './services/hash-argon2.service';
import { HashService } from './services/hash.service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: HashArgon2Service,
    },
  ],
  exports: [HashService],
})
export class HashModule {}
