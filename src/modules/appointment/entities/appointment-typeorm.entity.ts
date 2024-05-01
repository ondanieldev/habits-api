import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { UserTypeormEntity } from 'modules/user/entities/user-typeorm.entity';

import { AppointmentEntity } from './appointment.entity';

@Entity('appointments')
export class AppointmentTypeormEntity
  extends BaseTypeormEntity
  implements AppointmentEntity
{
  @Column('varchar')
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('boolean')
  isCompleted: boolean;

  @Column('boolean', { default: false })
  isNotificationEnabled: boolean;

  @Column('boolean', { default: false })
  isSoundEnabled: boolean;

  @Column('boolean', { default: false })
  isVibrationEnabled: boolean;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserTypeormEntity, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user?: UserTypeormEntity;
}
