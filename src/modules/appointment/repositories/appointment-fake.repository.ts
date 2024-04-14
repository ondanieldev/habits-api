import { Injectable } from '@nestjs/common';

import { BaseFakeRepository } from 'common/repositories/base-fake.repository';

import { CreateAppointmentBo, ReadAppointmentBo } from '../bos/appointment.bo';
import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentFakeRepository
  extends BaseFakeRepository<
    AppointmentEntity,
    CreateAppointmentBo,
    ReadAppointmentBo
  >
  implements AppointmentRepository {}
