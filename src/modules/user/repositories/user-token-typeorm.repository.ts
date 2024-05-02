import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateUserTokenBo } from '../bos/user-token.bo';
import { UserTokenTypeormEntity } from '../entities/user-token-typeorm.entity';
import {
  UserTokenEntity,
  UserTokenRelation,
} from '../entities/user-token.entity';
import { UserTokenRepository } from './user-token.repository';

@Injectable()
export class UserTokenTypeormRepository
  extends BaseTypeormRepository<
    UserTokenTypeormEntity,
    UserTokenEntity,
    CreateUserTokenBo,
    Partial<UserTokenEntity>,
    UserTokenRelation[]
  >
  implements UserTokenRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, UserTokenTypeormEntity);
  }
}
