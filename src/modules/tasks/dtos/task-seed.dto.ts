import { ArrayMinSize, IsIn, IsInt, IsString, Max, Min } from 'class-validator';

import { CreateTaskSeedBo } from '../bos/task-seed.bo';
import { TaskKind, taskKinds } from '../enums/task.enum';

export class CreateTaskSeedDto
  implements Omit<CreateTaskSeedBo, 'daysOfWeek' | 'userId'>
{
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  @ArrayMinSize(1)
  daysOfWeek: number[];

  @IsString()
  @IsIn(taskKinds)
  kind: TaskKind;

  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(86399)
  startsAtSecond: number;
}
