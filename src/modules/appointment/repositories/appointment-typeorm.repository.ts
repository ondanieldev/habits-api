import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTypeormRepository } from 'common/repositories/base-typeorm.repository';

import { CreateAppointmentBo, ReadAppointmentBo } from '../bos/appointment.bo';
import { AppointmentTypeormEntity } from '../entities/appointment-typeorm.entity';
import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentTypeormRepository
  extends BaseTypeormRepository<
    AppointmentTypeormEntity,
    AppointmentEntity,
    CreateAppointmentBo,
    ReadAppointmentBo
  >
  implements AppointmentRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, AppointmentTypeormEntity);
  }
}
