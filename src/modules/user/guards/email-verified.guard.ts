import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_EMAIL_NOT_VERIFIED_ROUTE } from '../decorators/is-email-not-verified-route.decorator';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isEmailNotVerifiedRoute = this.reflector.getAllAndOverride<boolean>(
      IS_EMAIL_NOT_VERIFIED_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isEmailNotVerifiedRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request['user'];

    if (!user?.emailVerified) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
