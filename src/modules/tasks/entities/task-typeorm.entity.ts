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

import { TaskSeedTypeormEntity } from './task-seed-typeorm.entity';
import { TaskEntity } from './task.entity';

@Entity('tasks')
export class TaskTypeormEntity implements TaskEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  date: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isChecked: boolean;

  @Column('uuid')
  taskSeedId: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TaskSeedTypeormEntity, (taskSeed) => taskSeed.tasks)
  @JoinColumn({ name: 'taskSeedId' })
  taskSeed?: TaskSeedTypeormEntity;
}
