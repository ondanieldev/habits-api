import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentTypeormEntity } from './entities/appointment-typeorm.entity';
import { AppointmentTypeormRepository } from './repositories/appointment-typeorm.repository';
import { AppointmentRepository } from './repositories/appointment.repository';
import { AppointmentAssertService } from './services/appointment-assert.service';
import { AppointmentService } from './services/appointment.service';

@Module({
  controllers: [AppointmentController],
  imports: [TypeOrmModule.forFeature([AppointmentTypeormEntity])],
  providers: [
    AppointmentAssertService,
    AppointmentService,
    {
      provide: AppointmentRepository,
      useClass: AppointmentTypeormRepository,
    },
  ],
})
export class AppointmentModule {}
