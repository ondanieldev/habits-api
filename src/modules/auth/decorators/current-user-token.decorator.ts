import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserTokenEntity } from 'modules/user/entities/user-token.entity';

export const CurrentUserToken = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserTokenEntity => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.userToken;
  },
);
