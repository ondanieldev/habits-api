import { BaseEntity } from 'common/entities/base.entity';

import { TaskEntity } from 'modules/tasks/entities/task.entity';

export const userRelations = ['tasks'] as const;
export type UserRelation = (typeof userRelations)[number];

export class UserEntity extends BaseEntity {
  email: string;
  password: string;
  tasks?: TaskEntity[];
}
