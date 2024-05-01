import { TaskEntity } from '../entities/task.entity';

export type CreateTaskBo = Pick<
  TaskEntity,
  | 'daysOfWeek'
  | 'hours'
  | 'minutes'
  | 'kind'
  | 'name'
  | 'userId'
  | 'isNotificationEnabled'
  | 'isSoundEnabled'
  | 'isVibrationEnabled'
>;
