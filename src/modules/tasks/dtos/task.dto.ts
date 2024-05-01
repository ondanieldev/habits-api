import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsIn,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { ToLowerCase } from 'modules/auth/decorators/to-lower-case.decorator';
import { Trim } from 'modules/auth/decorators/trim.decorator';

import { CreateTaskBo } from '../bos/task.bo';
import { IsHour } from '../decorators/is-hour.decorator';
import { IsMinute } from '../decorators/is-minute.decorator';
import { TaskKind, taskKinds } from '../enums/task.enum';

export class CreateTaskDto
  implements Omit<CreateTaskBo, 'daysOfWeek' | 'userId'>
{
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => [...new Set(value.map(Number))])
  daysOfWeek: number[];

  @IsString()
  @IsIn(taskKinds)
  @ToLowerCase()
  kind: TaskKind;

  @IsString()
  @Trim()
  name: string;

  @IsHour()
  hours: number;

  @IsMinute()
  minutes: number;

  @IsBoolean()
  isNotificationEnabled: boolean;

  @IsBoolean()
  isSoundEnabled: boolean;

  @IsBoolean()
  isVibrationEnabled: boolean;
}
