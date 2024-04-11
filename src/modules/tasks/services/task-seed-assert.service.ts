import { Injectable } from '@nestjs/common';

import { TaskSeedEntity } from '../entities/task-seed.entity';
import {
  TaskSeedNotFoundException,
  TaskSeedUserForbiddenException,
} from '../exceptions/task-seed.exception';
import { TaskSeedRepository } from '../repositories/task-seed.repository';

@Injectable()
export class TaskSeedAssertService {
  constructor(private taskSeedRepository: TaskSeedRepository) {}

  async assertExists(id: string) {
    const taskSeed = await this.taskSeedRepository.find({
      data: { id },
    });
    if (!taskSeed) {
      throw new TaskSeedNotFoundException();
    }
    return taskSeed;
  }

  async assertUserOwnership(taskSeed: TaskSeedEntity, userId: string) {
    if (taskSeed.userId !== userId) {
      throw new TaskSeedUserForbiddenException();
    }
  }
}
