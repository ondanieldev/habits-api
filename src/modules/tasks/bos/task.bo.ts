import { TaskEntity } from '../entities/task.entity';

export type CreateTaskBo = Pick<
  TaskEntity,
  'daysOfWeek' | 'startsAtSecond' | 'kind' | 'name' | 'userId'
>;
