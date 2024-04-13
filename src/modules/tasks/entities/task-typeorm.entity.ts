import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserTypeormEntity } from 'modules/user/entities/user-typeorm.entity';

import { TaskKind, taskKinds } from '../enums/task.enum';
import { CompletedTaskTypeormEntity } from './completed-task-typeorm.entity';
import { TaskEntity } from './task.entity';

@Entity('tasks')
export class TaskTypeormEntity implements TaskEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Transform(({ value }) => value.split(',').map(Number))
  @Column('varchar')
  daysOfWeek: string;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @PrimaryGeneratedColumn()
  id: string;

  @Column('enum', { enum: taskKinds })
  kind: TaskKind;

  @Column('varchar')
  name: string;

  @Column('int')
  startsAtSecond: number;

  @UpdateDateColumn()
  updatedAt: Date;

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
