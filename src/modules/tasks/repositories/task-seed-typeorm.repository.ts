import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateTaskSeedBo } from '../bos/task-seed.bo';
import { TaskSeedTypeormEntity } from '../entities/task-seed-typeorm.entity';
import { TaskSeedEntity, TaskSeedRelation } from '../entities/task-seed.entity';
import { TaskSeedRepository } from './task-seed.repository';

@Injectable()
export class TaskSeedTypeormRepository
  extends BaseTypeormRepository<
    TaskSeedTypeormEntity,
    TaskSeedEntity,
    CreateTaskSeedBo,
    TaskSeedRelation[]
  >
  implements TaskSeedRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, TaskSeedTypeormEntity);
  }
}
