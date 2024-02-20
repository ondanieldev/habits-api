import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class OffsetPaginationDto {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @IsNumber()
  @Min(1)
  @Max(1000)
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;
}
