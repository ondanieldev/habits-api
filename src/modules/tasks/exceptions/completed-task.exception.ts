import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export class CompletedTaskDateException extends BadRequestException {
  constructor(
    date?: { day: number; month: number; year: number },
    daysOfWeek?: number[],
  ) {
    super(
      `Date ${date ? `${date.month}/${date.day}/${date.year}` : ''} is not in the task days of week ${daysOfWeek ? `(${daysOfWeek.join(' or ')})` : ''}`,
    );
  }
}

export class CompletedTaskNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(`Completed task ${id || ''} not found`);
  }
}

export class CompletedTaskAlreadyExistsException extends ConflictException {
  constructor(
    id?: string,
    date?: { day: number; month: number; year: number },
  ) {
    super(
      `Task ${id} is already completed on day ${date ? `${date.month}/${date.day}/${date.year}` : ''}`,
    );
  }
}
