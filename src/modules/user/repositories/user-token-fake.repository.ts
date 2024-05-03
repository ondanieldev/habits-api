import { BaseFakeRepository } from 'common/repositories/base-fake.repository';

import { CreateUserTokenBo } from '../bos/user-token.bo';
import { UserTokenEntity } from '../entities/user-token.entity';

export class UserTokenFakeRepository extends BaseFakeRepository<
  UserTokenEntity,
  CreateUserTokenBo
> {}
