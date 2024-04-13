import { Transform } from 'class-transformer';
import { ArrayMinSize, IsIn, IsInt, IsString, Max, Min } from 'class-validator';

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
  kind: TaskKind;

  @IsString()
  name: string;

  @IsHour()
  hours: number;

  @IsMinute()
  minutes: number;
}
