import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongooseRepository } from 'common/repositories/base-mongoose.repository';

import { CreateUserBo } from '../bos/user.bo';
import { UserMongooseEntity } from '../entities/user-mongoose.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserMongooseRepository
  extends BaseMongooseRepository<UserMongooseEntity, UserEntity, CreateUserBo>
  implements UserRepository
{
  constructor(
    @InjectModel(UserMongooseEntity.name)
    userModel: Model<UserMongooseEntity>,
  ) {
    super(UserMongooseEntity, userModel);
  }
}
