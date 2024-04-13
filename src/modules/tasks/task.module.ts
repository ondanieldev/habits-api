import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'modules/user/user.module';

import { CompletedTaskController } from './controllers/completed-task.controller';
import { TaskController } from './controllers/task.controller';
import { CompletedTaskTypeormEntity } from './entities/completed-task-typeorm.entity';
import { TaskTypeormEntity } from './entities/task-typeorm.entity';
import { CompletedTaskTypeormRepository } from './repositories/completed-task-typeorm.repository';
import { CompletedTaskRepository } from './repositories/completed-task.repository';
import { TaskTypeormRepository } from './repositories/task-typeorm.repository';
import { TaskRepository } from './repositories/task.repository';
import { CompletedTaskAssertService } from './services/completed-task-assert.service';
import { CompletedTaskService } from './services/completed-task.service';
import { TaskAssertService } from './services/task-assert.service';
import { TaskService } from './services/task.service';

@Module({
  controllers: [CompletedTaskController, TaskController],
  imports: [
    TypeOrmModule.forFeature([CompletedTaskTypeormEntity, TaskTypeormEntity]),
    UserModule,
  ],
  providers: [
    CompletedTaskAssertService,
    CompletedTaskService,
    TaskAssertService,
    TaskService,
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
