import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from 'providers/cache/cache.module';
import { EmailModule } from 'providers/email/email.module';
import { HashModule } from 'providers/hash/hash.module';

import { ResetPasswordController } from './controllers/reset-password.controller';
import { UserPreferenceController } from './controllers/user-preference.controller';
import { UserController } from './controllers/user.controller';
import { VerifyEmailController } from './controllers/verify-email.controller';
import { UserTokenTypeormEntity } from './entities/user-token-typeorm.entity';
import { UserTypeormEntity } from './entities/user-typeorm.entity';
import { UserTokenTypeormRepository } from './repositories/user-token-typeorm.repository';
import { UserTokenRepository } from './repositories/user-token.repository';
import { UserTypeormRepository } from './repositories/user-typeorm.repository';
import { UserRepository } from './repositories/user.repository';
import { ResetPasswordService } from './services/reset-password.service';
import { UserPreferenceService } from './services/user-preference.service';
import { UserTokenService } from './services/user-token.service';
import { UserService } from './services/user.service';
import { VerifyEmailService } from './services/verify-email.service';

@Module({
  controllers: [
    ResetPasswordController,
    UserController,
    UserPreferenceController,
    VerifyEmailController,
  ],
  exports: [UserRepository, UserService, UserTokenService],
  imports: [
    CacheModule,
    EmailModule,
    HashModule,
    TypeOrmModule.forFeature([UserTypeormEntity, UserTokenTypeormEntity]),
  ],
  providers: [
    ResetPasswordService,
    UserService,
    UserPreferenceService,
    UserTokenService,
    VerifyEmailService,
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
