import { UserEntity } from '../entities/user.entity';

export type CreateUserBo = Pick<UserEntity, 'email' | 'password'>;
