import { UserEntity } from '../entities/user.entity';

export type UpsertUserPreferenceBo = Pick<
  UserEntity,
  'isNotificationEnabled' | 'isSoundEnabled' | 'isVibrationEnabled'
>;
