import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { OffsetPaginationBo } from 'common/bos/offset-pagination.bo';
import { OffsetPaginationDto } from 'common/dtos/offset-pagination.dto';

import { IsDay } from '../decorators/is-day.decorator';
import { IsMonth } from '../decorators/is-month.decorator';
import { CompletedTaskEntity } from '../entities/completed-task.entity';

export class CreateCompletedTaskDto {
  @IsDay()
  day: number;

  @IsMonth()
  month: number;

  @IsNumber()
  year: number;

  @IsString()
  taskId: string;
}

export class ReadCompletedTaskDto
  extends OffsetPaginationDto
  implements Partial<CompletedTaskEntity>, OffsetPaginationBo
{
  @IsDay()
  @IsOptional()
  day?: number;

  @IsMonth()
  @IsOptional()
  month?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  year?: number;
}
