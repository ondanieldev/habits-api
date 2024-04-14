import { Transform } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from 'common/entities/base-typeorm.entity';

import { UserTypeormEntity } from 'modules/user/entities/user-typeorm.entity';

import { TaskKind, taskKinds } from '../enums/task.enum';
import { CompletedTaskTypeormEntity } from './completed-task-typeorm.entity';
import { TaskEntity } from './task.entity';

@Entity('tasks')
export class TaskTypeormEntity extends BaseTypeormEntity implements TaskEntity {
  @Transform(({ value }) => value.split(',').map(Number))
  @Column('varchar')
  daysOfWeek: string;

  @Column('enum', { enum: taskKinds })
  kind: TaskKind;

  @Column('varchar')
  name: string;

  @Column('int')
  hours: number;

  @Column('int')
  minutes: number;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserTypeormEntity, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user?: UserTypeormEntity;

  @OneToMany(
    () => CompletedTaskTypeormEntity,
    (completedTask) => completedTask.task,
  )
  completedTasks?: CompletedTaskTypeormEntity[];
}
