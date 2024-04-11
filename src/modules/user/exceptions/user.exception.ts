import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class UserConflictException extends HttpException {
  constructor() {
    super('User email already in use', HttpStatus.CONFLICT);
  }
}
