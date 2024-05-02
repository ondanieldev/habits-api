import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserTokenGenerationException extends InternalServerErrorException {
  constructor() {
    super('An error occurred while generating the user token');
  }
}

export class UserTokenInvalidException extends UnauthorizedException {
  constructor() {
    super('The provided token is invalid');
  }
}

export class UserTokenExpiredException extends ForbiddenException {
  constructor() {
    super('The provided token is expired');
  }
}
