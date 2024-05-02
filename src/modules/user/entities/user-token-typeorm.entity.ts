import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { UserTokenType, userTokenTypes } from '../enums/user-token-type.enum';
import { UserTokenEntity } from './user-token.entity';
import { UserTypeormEntity } from './user-typeorm.entity';

@Entity('userTokens')
export class UserTokenTypeormEntity
  extends BaseTypeormEntity
  implements UserTokenEntity
{
  @Column('timestamp')
  expiresAt: Date;

  @Column('varchar')
  token: string;

  @Column('enum', { enum: userTokenTypes })
  type: UserTokenType;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserTypeormEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user?: UserTypeormEntity;
}
