import { BaseRepository } from 'common/repositories/base.repository';

import {
  CreateCompletedTaskBo,
  ReadCompletedTaskBo,
} from '../bos/completed-task.bo';
import { CompletedTaskEntity } from '../entities/completed-task.entity';

export class CompletedTaskRepository extends BaseRepository<
  CompletedTaskEntity,
  CreateCompletedTaskBo,
  ReadCompletedTaskBo
> {}
