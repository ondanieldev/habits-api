import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { UserEntity } from './user.entity';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
  @Column('varchar')
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;
}
