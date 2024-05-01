import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from 'modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.user;
  },
);
