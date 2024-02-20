import { BaseEntity } from 'common/entities/base.entity';

export class UserEntity extends BaseEntity {
  email: string;
  password: string;
}
