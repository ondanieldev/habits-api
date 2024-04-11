import { TaskEntity } from '../entities/task.entity';

export type CreateTaskBo = Pick<TaskEntity, 'date' | 'taskSeedId'>;
