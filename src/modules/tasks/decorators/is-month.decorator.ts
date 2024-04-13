import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export const IsMonth = () => {
  return applyDecorators(
    IsNumber(),
    Min(1),
    Max(12),
    Transform(({ value }) => parseInt(value)),
  );
};
