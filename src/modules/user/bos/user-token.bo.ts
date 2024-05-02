import { UserTokenEntity } from '../entities/user-token.entity';
import { UserTokenStrategy } from '../enums/user-token-strategy.enum';

export type CreateUserTokenBo = Pick<
  UserTokenEntity,
  'expiresAt' | 'token' | 'type' | 'userId'
>;

export type GenerateUserTokenBo = Pick<CreateUserTokenBo, 'type' | 'userId'> & {
  strategy: UserTokenStrategy;
};

export type ValidateUserTokenBo = {
  token: string;
  userId: string;
};
