import { Injectable } from '@nestjs/common';

import { CompletedTaskEntity } from '../entities/completed-task.entity';
import {
  CompletedTaskAlreadyExistsException,
  CompletedTaskDateException,
  CompletedTaskNotFoundException,
} from '../exceptions/completed-task.exception';
import { CompletedTaskRepository } from '../repositories/completed-task.repository';

@Injectable()
export class CompletedTaskAssertService {
  constructor(
    private readonly completedTaskRepository: CompletedTaskRepository,
  ) {}

  async assertExists(id: string) {
    const completedTask = await this.completedTaskRepository.find({
      data: { id },
    });

    if (!completedTask) {
      throw new CompletedTaskNotFoundException();
    }

    return completedTask;
  }

  async assertUniqueness({
    taskId,
    day,
    month,
    year,
  }: Pick<CompletedTaskEntity, 'taskId' | 'day' | 'month' | 'year'>) {
    const completedTask = await this.completedTaskRepository.find({
      data: { taskId, day, month, year },
    });

    if (completedTask) {
      throw new CompletedTaskAlreadyExistsException();
    }

    return completedTask;
  }

  assertDate({
    day,
    daysOfWeek,
    month,
    year,
  }: {
    day: number;
    month: number;
    year: number;
    daysOfWeek: number[];
  }) {
    const testDate = new Date(year, month - 1, day);

    if (
      testDate.getDate() !== day ||
      testDate.getMonth() !== month - 1 ||
      testDate.getFullYear() !== year ||
      !daysOfWeek.includes(testDate.getDay() + 1)
    ) {
      throw new CompletedTaskDateException();
    }
  }
}
