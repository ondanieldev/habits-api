import { Injectable } from '@nestjs/common';

import { OffsetPaginationBo } from 'common/bos/offset-pagination.bo';
import { OrderBo } from 'common/bos/order.bo';

import { CreateAppointmentBo, ReadAppointmentBo } from '../bos/appointment.bo';
import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { AppointmentAssertService } from './appointment-assert.service';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly assertService: AppointmentAssertService,
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async create(data: CreateAppointmentBo) {
    return this.appointmentRepository.create(data);
  }

  async readList({
    data,
    order,
    pagination,
    userId,
  }: {
    data: Omit<ReadAppointmentBo, 'userId'>;
    order: OrderBo<AppointmentEntity>;
    pagination: OffsetPaginationBo;
    userId: string;
  }) {
    return this.appointmentRepository.findMany({
      data: {
        ...data,
        userId,
      },
      order,
      pagination,
    });
  }

  async update({
    data,
    id,
    userId,
  }: {
    data: Omit<Partial<AppointmentEntity>, 'userId'>;
    id: string;
    userId: string;
  }) {
    const appointment = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(appointment, userId);

    Object.assign(appointment, data);

    return this.appointmentRepository.save(appointment);
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const appointment = await this.assertService.assertExists(id);
    await this.assertService.assertUserOwnership(appointment, userId);

    return this.appointmentRepository.delete(id);
  }
}
