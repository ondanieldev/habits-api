import { BaseEntity } from 'common/entities/base.entity';

import { TaskSeedEntity } from 'modules/tasks/entities/task-seed.entity';

export const userRelations = ['taskSeeds'] as const;
export type UserRelation = (typeof userRelations)[number];

export class UserEntity extends BaseEntity {
  email: string;
  password: string;
  taskSeeds?: TaskSeedEntity[];
}
