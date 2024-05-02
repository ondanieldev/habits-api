import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { AppointmentTypeormEntity } from 'modules/appointment/entities/appointment-typeorm.entity';
import { TaskTypeormEntity } from 'modules/tasks/entities/task-typeorm.entity';

import { UserTokenTypeormEntity } from './user-token-typeorm.entity';
import { UserEntity } from './user.entity';

@Entity('users')
export class UserTypeormEntity extends BaseTypeormEntity implements UserEntity {
  @Column('varchar')
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Exclude()
  @Column('varchar')
  accessToken?: string | null;

  @Column('boolean', { default: false })
  isNotificationEnabled: boolean;

  @Column('boolean', { default: false })
  isSoundEnabled: boolean;

  @Column('boolean', { default: false })
  isEmailVerified: boolean;

  @Exclude()
  @Column('varchar', { nullable: true })
  verifyEmailToken: string | null;

  @Exclude()
  @Column('timestamp', { nullable: true })
  verifyEmailTokenExpiresAt: Date | null;

  @OneToMany(() => TaskTypeormEntity, (task) => task.user)
  tasks?: TaskTypeormEntity[];

  @OneToMany(() => AppointmentTypeormEntity, (appointment) => appointment.user)
  appointments?: AppointmentTypeormEntity[];

  @OneToMany(() => UserTokenTypeormEntity, (token) => token.user)
  tokens?: UserTokenTypeormEntity[];
}
