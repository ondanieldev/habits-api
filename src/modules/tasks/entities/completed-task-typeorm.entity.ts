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
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  date: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  taskId: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TaskTypeormEntity, (task) => task.completedTasks)
  @JoinColumn({ name: 'taskId' })
  task?: TaskTypeormEntity;
}
