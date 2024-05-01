import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { UpsertUserPreferenceDto } from '../dtos/user-preference.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPreferenceService } from '../services/user-preference.service';

@ApiTags('User preferences')
@Controller('users/preferences')
export class UserPreferenceController {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @Patch()
  async update(
    @CurrentUser() user: UserEntity,
    @Body() data: UpsertUserPreferenceDto,
  ) {
    return this.userPreferenceService.update({ data, user });
  }
}
