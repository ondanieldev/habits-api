import { Injectable } from '@nestjs/common';

import { AppointmentEntity } from '../entities/appointment.entity';
import {
  AppointmentNotFoundException,
  AppointmentUserForbiddenException,
} from '../exceptions/appointment.exception';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class AppointmentAssertService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async assertExists(id: string) {
    const appointment = await this.appointmentRepository.find({ data: { id } });
    if (!appointment) {
      throw new AppointmentNotFoundException(id);
    }
    return appointment;
  }

  async assertUserOwnership(appointment: AppointmentEntity, userId: string) {
    if (appointment.userId !== userId) {
      throw new AppointmentUserForbiddenException(appointment.id, userId);
    }
  }
}
