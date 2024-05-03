import { Body, Controller, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { UpdateUserEmailDto } from '../dtos/user-email.dto';
import { UserEntity } from '../entities/user.entity';
import { UserEmailService } from '../services/user-email.service';

@ApiTags('Users: email')
@Controller('users/email')
export class UserEmailController {
  constructor(private readonly userEmailService: UserEmailService) {}

  @ApiBearerAuth()
  @Patch()
  readProfile(
    @CurrentUser() user: UserEntity,
    @Body() { email }: UpdateUserEmailDto,
  ) {
    return this.userEmailService.update({
      email,
      user,
    });
  }
}
