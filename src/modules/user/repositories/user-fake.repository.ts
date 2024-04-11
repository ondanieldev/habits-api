import { BaseFakeRepository } from 'common/repositories/base-fake.repository';

import { CreateUserBo } from '../bos/user.bo';
import { UserEntity } from '../entities/user.entity';

export class UserFakeRepository extends BaseFakeRepository<
  UserEntity,
  CreateUserBo
> {}
