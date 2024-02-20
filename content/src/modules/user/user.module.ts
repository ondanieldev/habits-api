import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheModule } from 'providers/cache/cache.module';
import { HashModule } from 'providers/hash/hash.module';

import { UserController } from './controllers/user.controller';
import { UserTypeormEntity } from './entities/user-typeorm.entity';
import { UserTypeormRepository } from './repositories/user-typeorm.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  exports: [UserRepository, UserService],
  imports: [
    CacheModule,
    HashModule,
    TypeOrmModule.forFeature([UserTypeormEntity]),
  ],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserTypeormRepository,
    },
  ],
})
export class UserModule {}
