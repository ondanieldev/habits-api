import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CacheModule } from 'providers/cache/cache.module';
import { HashModule } from 'providers/hash/hash.module';

import { UserController } from './controllers/user.controller';
import {
  UserMongooseEntity,
  UserMongooseSchema,
} from './entities/user-mongoose.entity';
import { UserMongooseRepository } from './repositories/user-mongoose.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  exports: [UserRepository, UserService],
  imports: [
    CacheModule,
    HashModule,
    MongooseModule.forFeature([
      { name: UserMongooseEntity.name, schema: UserMongooseSchema },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserMongooseRepository,
    },
  ],
})
export class UserModule {}
