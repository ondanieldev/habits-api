import { BaseEntity } from 'common/entities/base.entity';

import { UserEntity } from 'modules/user/entities/user.entity';

import { TaskKind } from '../enums/task.enum';

export const taskSeedRelations = ['user'] as const;
export type TaskSeedRelation = (typeof taskSeedRelations)[number];

export class TaskSeedEntity extends BaseEntity {
  kind: TaskKind;
  name: string;
  startsAtSecond: number;
  daysOfWeek: string;
  userId: string;
  user?: UserEntity;
}
