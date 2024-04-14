import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class AppointmentNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(`Appointment ${id || ' '} not found`);
  }
}

export class AppointmentUserForbiddenException extends ForbiddenException {
  constructor(id?: string, userId?: string) {
    super(
      `User ${userId || ''} is not allowed to manage appointment ${id || ''}`,
    );
  }
}
