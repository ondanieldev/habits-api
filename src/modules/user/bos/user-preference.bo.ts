import { UserEntity } from '../entities/user.entity';

export type UpsertUserPreferenceBo = Pick<
  UserEntity,
  'isSoundEnabled' | 'isVibrationEnabled'
>;
