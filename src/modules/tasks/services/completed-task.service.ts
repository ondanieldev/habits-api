import { Injectable } from '@nestjs/common';

import { OffsetPaginationBo } from 'common/bos/offset-pagination.bo';
import { OrderBo } from 'common/bos/order.bo';

import {
  CreateCompletedTaskBo,
  ReadCompletedTaskBo,
} from '../bos/completed-task.bo';
import { CompletedTaskEntity } from '../entities/completed-task.entity';
import { CompletedTaskRepository } from '../repositories/completed-task.repository';
import { CompletedTaskAssertService } from './completed-task-assert.service';
import { TaskAssertService } from './task-assert.service';

@Injectable()
export class CompletedTaskService {
  constructor(
    private readonly taskAssertService: TaskAssertService,
    private readonly completedTaskAssertService: CompletedTaskAssertService,
    private readonly completedTaskRepository: CompletedTaskRepository,
  ) {}

  async create({
    data: { taskId, day, month, year },
    userId,
  }: {
    data: CreateCompletedTaskBo;
    userId: string;
  }) {
    const task = await this.taskAssertService.assertExists(taskId);
    await this.taskAssertService.assertUserOwnership(task, userId);

    await this.completedTaskAssertService.assertUniqueness({
      day,
      month,
      year,
      taskId,
    });

    this.completedTaskAssertService.assertDate({
      day,
      month,
      year,
      daysOfWeek: task.daysOfWeek.split(',').map(Number),
    });

    return this.completedTaskRepository.create({
      day,
      month,
      year,
      taskId,
    });
  }

  async readList({
    data,
    order,
    pagination,
  }: {
    data: ReadCompletedTaskBo;
    order: OrderBo<CompletedTaskEntity>;
    pagination: OffsetPaginationBo;
  }) {
    return this.completedTaskRepository.findMany({
      data,
      order,
      pagination,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const completedTask =
      await this.completedTaskAssertService.assertExists(id);
    await this.taskAssertService.assertUserOwnership(
      completedTask.task,
      userId,
    );

    await this.completedTaskRepository.delete(id);
  }
}
