import { IsBoolean } from 'class-validator';

import { UpsertUserPreferenceBo } from '../bos/user-preference.bo';

export class UpsertUserPreferenceDto implements UpsertUserPreferenceBo {
  @IsBoolean()
  isNotificationEnabled: boolean;

  @IsBoolean()
  isSoundEnabled: boolean;

  @IsBoolean()
  isVibrationEnabled: boolean;
}
