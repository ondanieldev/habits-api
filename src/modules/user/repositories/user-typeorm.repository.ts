import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateUserBo } from '../bos/user.bo';
import { UserTypeormEntity } from '../entities/user-typeorm.entity';
import { UserEntity, UserRelation } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserTypeormRepository
  extends BaseTypeormRepository<
    UserTypeormEntity,
    UserEntity,
    CreateUserBo,
    Partial<UserEntity>,
    UserRelation[]
  >
  implements UserRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, UserTypeormEntity);
  }
}
