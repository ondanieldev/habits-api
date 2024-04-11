import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class TaskSeedNotFoundException extends BadRequestException {
  constructor() {
    super('Task Seed not found.');
  }
}

export class TaskSeedUserForbiddenException extends ForbiddenException {
  constructor() {
    super('You are not allowed to perform this action.');
  }
}
