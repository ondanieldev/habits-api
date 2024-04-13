import { BaseRepository } from 'common/repositories/base.repository';

import { CreateUserBo } from '../bos/user.bo';
import { UserEntity, UserRelation } from '../entities/user.entity';

export class UserRepository extends BaseRepository<
  UserEntity,
  CreateUserBo,
  Partial<UserEntity>,
  UserRelation[]
> {}
