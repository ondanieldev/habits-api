import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

import { OffsetPaginationDto } from 'common/dtos/offset-pagination.dto';

import { CreateAppointmentBo } from '../bos/appointment.bo';

export class CreateAppointmentDto
  implements Omit<CreateAppointmentBo, 'userId' | 'date'>
{
  @IsDateString()
  date: string;

  @IsString()
  name: string;

  @IsBoolean()
  isNotificationEnabled: boolean;

  @IsBoolean()
  isSoundEnabled: boolean;

  @IsBoolean()
  isVibrationEnabled: boolean;
}

export class UpdateAppointmentDto extends CreateAppointmentDto {
  @IsBoolean()
  isCompleted: boolean;
}

export class ReadAppointmentDto extends OffsetPaginationDto {
  @IsDateString()
  @IsOptional()
  maxDate?: string;

  @IsDateString()
  @IsOptional()
  minDate?: string;
}
