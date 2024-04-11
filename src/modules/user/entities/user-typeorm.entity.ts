import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { TaskSeedTypeormEntity } from 'modules/tasks/entities/task-seed-typeorm.entity';

import { UserEntity } from './user.entity';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
  @Column('varchar')
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @OneToMany(() => TaskSeedTypeormEntity, (taskSeed) => taskSeed.user)
  taskSeeds?: TaskSeedTypeormEntity[];
}
