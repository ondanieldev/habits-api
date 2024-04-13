import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateTaskBo } from '../bos/task.bo';
import { TaskTypeormEntity } from '../entities/task-typeorm.entity';
import { TaskEntity, TaskRelation } from '../entities/task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskTypeormRepository
  extends BaseTypeormRepository<
    TaskTypeormEntity,
    TaskEntity,
    CreateTaskBo,
    Partial<TaskEntity>,
    TaskRelation[]
  >
  implements TaskRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, TaskTypeormEntity);
  }
}
