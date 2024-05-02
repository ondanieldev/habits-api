import { BaseRepository } from 'common/repositories/base.repository';

import { CreateUserTokenBo } from '../bos/user-token.bo';
import {
  UserTokenEntity,
  UserTokenRelation,
} from '../entities/user-token.entity';

export class UserTokenRepository extends BaseRepository<
  UserTokenEntity,
  CreateUserTokenBo,
  Partial<UserTokenEntity>,
  UserTokenRelation[]
> {}
