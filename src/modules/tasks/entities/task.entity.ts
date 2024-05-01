import { BaseEntity } from 'common/entities/base.entity';

import { UserEntity } from 'modules/user/entities/user.entity';

import { TaskKind } from '../enums/task.enum';

export const taskRelations = ['user'] as const;
export type TaskRelation = (typeof taskRelations)[number];

export class TaskEntity extends BaseEntity {
  kind: TaskKind;
  name: string;
  hours: number;
  minutes: number;
  daysOfWeek: string;
  isNotificationEnabled: boolean;
  isSoundEnabled: boolean;
  isVibrationEnabled: boolean;
  userId: string;
  user?: UserEntity;
}
