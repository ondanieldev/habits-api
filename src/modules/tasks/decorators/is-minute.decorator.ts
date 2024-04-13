import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export const IsMinute = () => {
  return applyDecorators(
    IsInt(),
    Min(0),
    Max(59),
    Transform(({ value }) => parseInt(value)),
  );
};
