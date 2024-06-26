import { BaseEntity } from 'common/entities/base.entity';

import { AppointmentEntity } from 'modules/appointment/entities/appointment.entity';
import { TaskEntity } from 'modules/tasks/entities/task.entity';

import { UserTokenEntity } from './user-token.entity';

export const userRelations = ['tasks'] as const;
export type UserRelation = (typeof userRelations)[number];

export class UserEntity extends BaseEntity {
  email: string;
  password: string;
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  isEmailVerified: boolean;
  tasks?: TaskEntity[];
  appointments?: AppointmentEntity[];
  tokens?: UserTokenEntity[];
}
