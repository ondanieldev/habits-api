import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from 'modules/auth/decorators/is-public-route.decorator';

import {
  GenerateResetPasswordTokenDto,
  ResetPasswordDto,
  ValidateResetPasswordTokenDto,
} from '../dtos/reset-password.dto';
import { ResetPasswordService } from '../services/reset-password.service';

@ApiTags('Users: reset password')
@Controller('/users/reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @PublicRoute()
  @Post('/generate-token')
  @HttpCode(204)
  async generateToken(@Body() dto: GenerateResetPasswordTokenDto) {
    await this.resetPasswordService.generateToken(dto);
  }

  @PublicRoute()
  @Post('/validate-token')
  @HttpCode(204)
  async validateToken(@Body() dto: ValidateResetPasswordTokenDto) {
    await this.resetPasswordService.validateToken(dto);
  }

  @PublicRoute()
  @Post()
  @HttpCode(204)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.resetPasswordService.resetPassword(dto);
  }
}
