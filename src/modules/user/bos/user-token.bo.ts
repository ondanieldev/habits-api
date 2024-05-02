import { UserTokenEntity } from '../entities/user-token.entity';

export type CreateUserTokenBo = Pick<
  UserTokenEntity,
  'expiresAt' | 'token' | 'type' | 'userId'
>;
