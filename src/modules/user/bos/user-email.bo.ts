import { UserEntity } from '../entities/user.entity';

export interface ValidateUserEmailBo {
  email: string;
  user?: UserEntity;
}

export interface UpdateUserEmailBo {
  email: string;
  user: UserEntity;
}
