import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export const IsHour = () => {
  return applyDecorators(
    IsInt(),
    Min(0),
    Max(23),
    Transform(({ value }) => parseInt(value)),
  );
};
