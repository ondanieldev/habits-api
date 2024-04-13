import { CompletedTaskEntity } from '../entities/completed-task.entity';
import { TaskEntity } from '../entities/task.entity';

export type CreateCompletedTaskBo = Pick<
  CompletedTaskEntity,
  'day' | 'month' | 'year' | 'taskId'
>;

export type ReadCompletedTaskBo = Omit<Partial<CompletedTaskEntity>, 'task'> & {
  task?: Partial<TaskEntity>;
};
