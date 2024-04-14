import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUserBo } from 'modules/auth/bos/auth.bo';
import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import {
  CreateAppointmentDto,
  ReadAppointmentDto,
  UpdateAppointmentDto,
} from '../dtos/appointment.dto';
import { AppointmentService } from '../services/appointment.service';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(
    @Body() { date, ...rest }: CreateAppointmentDto,
    @CurrentUser() user: AuthUserBo,
  ) {
    return this.appointmentService.create({
      userId: user.sub,
      date: new Date(date),
      ...rest,
    });
  }

  @Get()
  readList(
    @Query()
    { limit, page, maxDate, minDate, ...rest }: ReadAppointmentDto,
    @CurrentUser() user: AuthUserBo,
  ) {
    return this.appointmentService.readList({
      data: {
        maxDate: maxDate ? new Date(maxDate) : undefined,
        minDate: minDate ? new Date(minDate) : undefined,
        ...rest,
      },
      userId: user.sub,
      order: { date: 'ASC' },
      pagination: { limit, page },
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() { date, ...rest }: UpdateAppointmentDto,
    @CurrentUser() user: AuthUserBo,
  ) {
    return this.appointmentService.update({
      data: {
        date: new Date(date),
        ...rest,
      },
      id,
      userId: user.sub,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: AuthUserBo) {
    return this.appointmentService.delete({
      id,
      userId: user.sub,
    });
  }
}
