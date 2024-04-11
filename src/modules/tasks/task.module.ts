import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'modules/user/user.module';

import { TaskSeedController } from './controllers/task-seed.controller';
import { TaskSeedTypeormEntity } from './entities/task-seed-typeorm.entity';
import { TaskTypeormEntity } from './entities/task-typeorm.entity';
import { TaskSeedTypeormRepository } from './repositories/task-seed-typeorm.repository';
import { TaskSeedRepository } from './repositories/task-seed.repository';
import { TaskTypeormRepository } from './repositories/task-typeorm.repository';
import { TaskRepository } from './repositories/task.repository';
import { TaskSeedAssertService } from './services/task-seed-assert.service';
import { TaskSeedSanitizeService } from './services/task-seed-sanitize.service';
import { TaskSeedService } from './services/task-seed.service';
import { TaskService } from './services/task.service';

@Module({
  controllers: [TaskSeedController],
  imports: [
    TypeOrmModule.forFeature([TaskTypeormEntity, TaskSeedTypeormEntity]),
    UserModule,
  ],
  providers: [
    TaskSeedAssertService,
    TaskSeedSanitizeService,
    TaskSeedService,
    TaskService,
    {
      provide: TaskRepository,
      useClass: TaskTypeormRepository,
    },
    {
      provide: TaskSeedRepository,
      useClass: TaskSeedTypeormRepository,
    },
  ],
})
export class TaskModule {}
