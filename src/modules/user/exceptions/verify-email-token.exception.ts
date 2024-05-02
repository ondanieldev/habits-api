import { UnauthorizedException } from '@nestjs/common';

export class VerifyEmailTokenInvalidException extends UnauthorizedException {
  constructor() {
    super('The token is not valid');
  }
}

export class VerifyEmailTokenExpiredException extends UnauthorizedException {
  constructor() {
    super('The token is already expired');
  }
}
