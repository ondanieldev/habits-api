import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthUserBo } from '../auth/bos/auth.bo';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUserBo => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.user;
  },
);
