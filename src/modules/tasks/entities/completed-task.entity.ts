import { BaseEntity } from 'common/entities/base.entity';

import { TaskEntity } from './task.entity';

export const completedTaskRelations = ['task'] as const;
export type CompletedTaskRelation = (typeof completedTaskRelations)[number];

export class CompletedTaskEntity extends BaseEntity {
  day: number;
  month: number;
  year: number;
  taskId: string;
  task: TaskEntity;
}
