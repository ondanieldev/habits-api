import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class TaskNotFoundException extends BadRequestException {
  constructor() {
    super('Task not found.');
  }
}

export class TaskUserForbiddenException extends ForbiddenException {
  constructor() {
    super('You are not allowed to perform this action.');
  }
}
