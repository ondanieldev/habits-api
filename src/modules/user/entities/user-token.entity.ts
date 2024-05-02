import { BaseEntity } from 'common/entities/base.entity';

import { UserTokenType } from '../enums/user-token-type.enum';
import { UserEntity } from './user.entity';

export const userTokenRelations = ['user'] as const;
export type UserTokenRelation = (typeof userTokenRelations)[number];

export class UserTokenEntity extends BaseEntity {
  token: string;
  type: UserTokenType;
  expiresAt: Date;
  userId: string;
  user?: UserEntity;
}
