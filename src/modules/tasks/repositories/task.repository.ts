import { BaseRepository } from 'common/repositories/base.repository';

import { CreateTaskBo } from '../bos/task.bo';
import { TaskEntity } from '../entities/task.entity';

export class TaskRepository extends BaseRepository<TaskEntity, CreateTaskBo> {}
