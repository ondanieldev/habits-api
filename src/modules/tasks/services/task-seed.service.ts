import { Injectable } from '@nestjs/common';

import { OffsetPaginationBo } from 'common/bos/offset-pagination.bo';
import { OrderBo } from 'common/bos/order.bo';

import { CreateTaskSeedBo } from '../bos/task-seed.bo';
import { TaskSeedEntity } from '../entities/task-seed.entity';
import { TaskSeedRepository } from '../repositories/task-seed.repository';
import { TaskSeedAssertService } from './task-seed-assert.service';
import { TaskSeedSanitizeService } from './task-seed-sanitize.service';

@Injectable()
export class TaskSeedService {
  constructor(
    private assertService: TaskSeedAssertService,
    private sanitizeService: TaskSeedSanitizeService,
    private taskSeedRepository: TaskSeedRepository,
  ) {}

  async create({
    daysOfWeek,
    kind,
    name,
    startsAtSecond,
    userId,
  }: Omit<CreateTaskSeedBo, 'daysOfWeek'> & { daysOfWeek: number[] }) {
    return this.taskSeedRepository.create({
      daysOfWeek: this.sanitizeService.sanitizeDaysOfWeek(daysOfWeek),
      startsAtSecond,
      kind,
      name,
      userId,
    });
  }

  async readList({
    data,
    userId,
    pagination,
    order,
  }: {
    data: Partial<TaskSeedEntity>;
    userId: string;
    pagination: OffsetPaginationBo;
    order?: OrderBo<TaskSeedEntity>;
  }) {
    return this.taskSeedRepository.findMany({
      data: { ...data, userId },
      pagination,
      order,
    });
  }

  async update({
    id,
    data: { daysOfWeek, kind, name, startsAtSecond, userId },
  }: {
    id: string;
    data: Omit<CreateTaskSeedBo, 'daysOfWeek'> & { daysOfWeek: number[] };
  }) {
    const taskSeed = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(taskSeed, userId);

    Object.assign(taskSeed, {
      id,
      daysOfWeek: this.sanitizeService.sanitizeDaysOfWeek(daysOfWeek),
      startsAtSecond,
      kind,
      name,
      userId,
    });

    return this.taskSeedRepository.save(taskSeed);
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const taskSeed = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(taskSeed, userId);

    return this.taskSeedRepository.delete(id);
  }
}
