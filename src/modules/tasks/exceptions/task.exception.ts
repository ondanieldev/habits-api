import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class TaskNotFoundException extends BadRequestException {
  constructor(id?: string) {
    super(`Task ${id || ''} not found`);
  }
}

export class TaskUserForbiddenException extends ForbiddenException {
  constructor(id?: string, userId?: string) {
    super(`User ${userId || ''} is not allowed to manage task ${id || ''}`);
  }
}
