import { Injectable } from '@nestjs/common';

import { OffsetPaginationBo } from 'common/bos/offset-pagination.bo';
import { OrderBo } from 'common/bos/order.bo';

import { CreateTaskBo } from '../bos/task.bo';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';
import { TaskAssertService } from './task-assert.service';

@Injectable()
export class TaskService {
  constructor(
    private assertService: TaskAssertService,
    private taskRepository: TaskRepository,
  ) {}

  async create({
    daysOfWeek,
    ...data
  }: Omit<CreateTaskBo, 'daysOfWeek'> & { daysOfWeek: number[] }) {
    return this.taskRepository.create({
      daysOfWeek: daysOfWeek.join(','),
      ...data,
    });
  }

  async readList({
    data,
    userId,
    pagination,
    order,
  }: {
    data: Omit<Partial<TaskEntity>, 'userId'>;
    userId: string;
    pagination: OffsetPaginationBo;
    order?: OrderBo<TaskEntity>;
  }) {
    return this.taskRepository.findMany({
      data: { ...data, userId },
      pagination,
      order,
    });
  }

  async update({
    id,
    data: { daysOfWeek, ...data },
    userId,
  }: {
    id: string;
    data: Omit<CreateTaskBo, 'daysOfWeek' | 'userId'> & {
      daysOfWeek: number[];
    };
    userId: string;
  }) {
    const task = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(task, userId);

    Object.assign(task, {
      id,
      daysOfWeek: daysOfWeek.join(','),
      ...data,
    });

    return this.taskRepository.save(task);
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const task = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(task, userId);

    return this.taskRepository.delete(id);
  }
}
