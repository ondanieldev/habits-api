import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export const IsDay = () => {
  return applyDecorators(
    IsInt(),
    Min(1),
    Max(31),
    Transform(({ value }) => parseInt(value)),
  );
};
