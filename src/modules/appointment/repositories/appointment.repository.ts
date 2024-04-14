import { BaseRepository } from 'common/repositories/base.repository';

import { CreateAppointmentBo, ReadAppointmentBo } from '../bos/appointment.bo';
import { AppointmentEntity } from '../entities/appointment.entity';

export class AppointmentRepository extends BaseRepository<
  AppointmentEntity,
  CreateAppointmentBo,
  ReadAppointmentBo
> {}
