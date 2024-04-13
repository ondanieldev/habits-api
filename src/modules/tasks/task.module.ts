import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'modules/user/user.module';

import { TaskController } from './controllers/task.controller';
import { CompletedTaskTypeormEntity } from './entities/completed-task-typeorm.entity';
import { TaskTypeormEntity } from './entities/task-typeorm.entity';
import { CompletedTaskTypeormRepository } from './repositories/completed-task-typeorm.repository';
import { CompletedTaskRepository } from './repositories/completed-task.repository';
import { TaskTypeormRepository } from './repositories/task-typeorm.repository';
import { TaskRepository } from './repositories/task.repository';
import { CompletedTaskService } from './services/completed-task.service';
import { TaskAssertService } from './services/task-assert.service';
import { TaskSanitizeService } from './services/task-sanitize.service';
import { TaskService } from './services/task.service';

@Module({
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([CompletedTaskTypeormEntity, TaskTypeormEntity]),
    UserModule,
  ],
  providers: [
    TaskAssertService,
    TaskSanitizeService,
    TaskService,
    CompletedTaskService,
    {
      provide: CompletedTaskRepository,
      useClass: CompletedTaskTypeormRepository,
    },
    {
      provide: TaskRepository,
      useClass: TaskTypeormRepository,
    },
  ],
})
export class TaskModule {}
