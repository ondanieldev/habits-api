import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { UserVerifyEmailDto } from '../dtos/user-verify-email.dto';
import { UserEntity } from '../entities/user.entity';
import { UserVerifyEmailService } from '../services/user-verify-email.service';

@ApiTags('Users: verify email')
@Controller('users/verify-email')
export class UserVerifyEmailController {
  constructor(
    private readonly userVerifyEmailService: UserVerifyEmailService,
  ) {}

  @ApiBearerAuth()
  @Get()
  async requestToken(@CurrentUser() user: UserEntity) {
    await this.userVerifyEmailService.requestToken(user);
  }

  @ApiBearerAuth()
  @Post()
  async validateToken(
    @CurrentUser() user: UserEntity,
    @Body() dto: UserVerifyEmailDto,
  ) {
    await this.userVerifyEmailService.validateToken({
      user,
      data: dto,
    });
  }
}
