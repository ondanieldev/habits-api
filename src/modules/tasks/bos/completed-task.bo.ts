import { CompletedTaskEntity } from '../entities/completed-task.entity';

export type CreateCompletedTaskBo = Pick<
  CompletedTaskEntity,
  'date' | 'taskId'
>;
