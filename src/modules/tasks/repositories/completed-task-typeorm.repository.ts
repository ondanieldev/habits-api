import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateCompletedTaskBo } from '../bos/completed-task.bo';
import { CompletedTaskTypeormEntity } from '../entities/completed-task-typeorm.entity';
import {
  CompletedTaskEntity,
  CompletedTaskRelation,
} from '../entities/completed-task.entity';
import { CompletedTaskRepository } from './completed-task.repository';

@Injectable()
export class CompletedTaskTypeormRepository
  extends BaseTypeormRepository<
    CompletedTaskTypeormEntity,
    CompletedTaskEntity,
    CreateCompletedTaskBo,
    CompletedTaskRelation[]
  >
  implements CompletedTaskRepository
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, CompletedTaskTypeormEntity);
  }
}
