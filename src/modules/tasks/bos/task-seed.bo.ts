import { TaskSeedEntity } from '../entities/task-seed.entity';

export type CreateTaskSeedBo = Pick<
  TaskSeedEntity,
  'daysOfWeek' | 'startsAtSecond' | 'kind' | 'name' | 'userId'
>;
