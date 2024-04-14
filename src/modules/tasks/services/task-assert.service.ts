import { Injectable } from '@nestjs/common';

import { TaskEntity } from '../entities/task.entity';
import {
  TaskNotFoundException,
  TaskUserForbiddenException,
} from '../exceptions/task.exception';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskAssertService {
  constructor(private taskRepository: TaskRepository) {}

  async assertExists(id: string) {
    const task = await this.taskRepository.find({
      data: { id },
    });
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  async assertUserOwnership(task: TaskEntity, userId: string) {
    if (task.userId !== userId) {
      throw new TaskUserForbiddenException(task.id, userId);
    }
  }
}
