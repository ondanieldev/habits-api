import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompletedTaskEntity } from './completed-task.entity';
import { TaskTypeormEntity } from './task-typeorm.entity';

@Entity('completedTasks')
export class CompletedTaskTypeormEntity implements CompletedTaskEntity {
  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Column('int')
  day: number;

  @Column('int')
  month: number;

  @Column('int')
  year: number;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  taskId: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TaskTypeormEntity, (task) => task.completedTasks, {
    eager: true,
  })
  @JoinColumn({ name: 'taskId' })
  task: TaskTypeormEntity;
}
