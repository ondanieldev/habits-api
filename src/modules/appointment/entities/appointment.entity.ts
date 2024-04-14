import { BaseEntity } from 'common/entities/base.entity';

import { UserEntity } from 'modules/user/entities/user.entity';

export class AppointmentEntity extends BaseEntity {
  name: string;
  date: Date;
  isCompleted: boolean;
  userId: string;
  user?: UserEntity;
}
