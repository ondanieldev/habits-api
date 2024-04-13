import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class CompletedTaskDateException extends BadRequestException {
  constructor() {
    super('Date is not in the task days of week.');
  }
}

export class CompletedTaskNotFoundException extends NotFoundException {
  constructor() {
    super('Completed task not found.');
  }
}

export class CompletedTaskAlreadyExistsException extends ConflictException {
  constructor() {
    super('Task already completed on this day.');
  }
}
