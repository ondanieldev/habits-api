import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from 'providers/cache/cache.module';
import { HashModule } from 'providers/hash/hash.module';

import { UserPreferenceController } from './controllers/user-preference.controller';
import { UserController } from './controllers/user.controller';
import { UserTypeormEntity } from './entities/user-typeorm.entity';
import { UserTypeormRepository } from './repositories/user-typeorm.repository';
import { UserRepository } from './repositories/user.repository';
import { UserPreferenceService } from './services/user-preference.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController, UserPreferenceController],
  exports: [UserRepository, UserService],
  imports: [
    CacheModule,
    HashModule,
    TypeOrmModule.forFeature([UserTypeormEntity]),
  ],
  providers: [
    UserService,
    UserPreferenceService,
    {
      provide: UserRepository,
      useClass: UserTypeormRepository,
    },
  ],
})
export class UserModule {}
