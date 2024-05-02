import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from 'providers/cache/cache.module';
import { EmailModule } from 'providers/email/email.module';
import { HashModule } from 'providers/hash/hash.module';

import { UserPreferenceController } from './controllers/user-preference.controller';
import { UserVerifyEmailController } from './controllers/user-verify-email.controller';
import { UserController } from './controllers/user.controller';
import { UserTokenTypeormEntity } from './entities/user-token-typeorm.entity';
import { UserTypeormEntity } from './entities/user-typeorm.entity';
import { UserTokenTypeormRepository } from './repositories/user-token-typeorm.repository';
import { UserTokenRepository } from './repositories/user-token.repository';
import { UserTypeormRepository } from './repositories/user-typeorm.repository';
import { UserRepository } from './repositories/user.repository';
import { UserPreferenceService } from './services/user-preference.service';
import { UserVerifyEmailService } from './services/user-verify-email.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [
    UserController,
    UserPreferenceController,
    UserVerifyEmailController,
  ],
  exports: [UserRepository, UserService],
  imports: [
    CacheModule,
    EmailModule,
    HashModule,
    TypeOrmModule.forFeature([UserTypeormEntity, UserTokenTypeormEntity]),
  ],
  providers: [
    UserService,
    UserPreferenceService,
    UserVerifyEmailService,
    {
      provide: UserRepository,
      useClass: UserTypeormRepository,
    },
    {
      provide: UserTokenRepository,
      useClass: UserTokenTypeormRepository,
    },
  ],
})
export class UserModule {}
