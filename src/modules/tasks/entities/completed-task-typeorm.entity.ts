import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { CompletedTaskEntity } from './completed-task.entity';
import { TaskTypeormEntity } from './task-typeorm.entity';

@Entity('completedTasks')
export class CompletedTaskTypeormEntity
  extends BaseTypeormEntity
  implements CompletedTaskEntity
{
  @Column('int')
  day: number;

  @Column('int')
  month: number;

  @Column('int')
  year: number;

  @Column('uuid')
  taskId: string;

  @ManyToOne(() => TaskTypeormEntity, (task) => task.completedTasks, {
    eager: true,
  })
  @JoinColumn({ name: 'taskId' })
  task: TaskTypeormEntity;
}
