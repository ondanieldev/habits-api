import { BaseRepository } from 'common/repositories/base.repository';

import { CreateTaskSeedBo } from '../bos/task-seed.bo';
import { TaskSeedEntity } from '../entities/task-seed.entity';

export class TaskSeedRepository extends BaseRepository<
  TaskSeedEntity,
  CreateTaskSeedBo
> {}
