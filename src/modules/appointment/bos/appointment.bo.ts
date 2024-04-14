import { AppointmentEntity } from '../entities/appointment.entity';

export type CreateAppointmentBo = Pick<
  AppointmentEntity,
  'date' | 'name' | 'userId'
>;

export type ReadAppointmentBo = Partial<AppointmentEntity> & {
  minDate?: Date;
  maxDate?: Date;
};
