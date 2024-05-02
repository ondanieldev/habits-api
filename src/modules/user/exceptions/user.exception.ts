import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(`User ${id || ''} not found`);
  }
}

export class UserEmailConflictException extends ConflictException {
  constructor(email?: string) {
    super(`Email ${email || ''} is already in use`);
  }
}

export class UserEmailAlreadyVerifiedException extends BadRequestException {
  constructor() {
    super('Email is already verified');
  }
}
