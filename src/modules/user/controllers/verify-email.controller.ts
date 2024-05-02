import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { UserEntity } from '../entities/user.entity';
import { VerifyEmailService } from '../services/verify-email.service';

@ApiTags('Users: verify email')
@Controller('users/verify-email')
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @ApiBearerAuth()
  @Post('generate-token')
  @HttpCode(204)
  async generateToken(@CurrentUser() user: UserEntity) {
    await this.verifyEmailService.generateToken(user);
  }

  @ApiBearerAuth()
  @Post()
  @HttpCode(204)
  async validateToken(
    @CurrentUser() user: UserEntity,
    @Body() dto: VerifyEmailDto,
  ) {
    await this.verifyEmailService.verifyEmail({
      user,
      data: dto,
    });
  }
}
