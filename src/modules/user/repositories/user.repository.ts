import { BaseRepository } from 'common/repositories/base.repository';

import { CreateUserBo } from '../bos/user.bo';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends BaseRepository<UserEntity, CreateUserBo> {}
