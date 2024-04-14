import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { AppointmentTypeormEntity } from 'modules/appointment/entities/appointment-typeorm.entity';
import { TaskTypeormEntity } from 'modules/tasks/entities/task-typeorm.entity';

import { UserEntity } from './user.entity';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
  @Column('varchar')
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @OneToMany(() => TaskTypeormEntity, (task) => task.user)
  tasks?: TaskTypeormEntity[];

  @OneToMany(() => AppointmentTypeormEntity, (appointment) => appointment.user)
  appointments?: AppointmentTypeormEntity[];
}
