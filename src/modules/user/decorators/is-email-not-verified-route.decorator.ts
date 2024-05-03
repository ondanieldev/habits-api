import { SetMetadata } from '@nestjs/common';

export const IS_EMAIL_NOT_VERIFIED_ROUTE = 'isEmailNotVerifiedRoute';
export const EmailNotVerifiedRoute = () =>
  SetMetadata(IS_EMAIL_NOT_VERIFIED_ROUTE, true);
