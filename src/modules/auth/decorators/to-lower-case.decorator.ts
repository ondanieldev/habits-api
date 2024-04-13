import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const ToLowerCase = () => {
  return applyDecorators(
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return value.toLowerCase();
      }
    }),
  );
};
