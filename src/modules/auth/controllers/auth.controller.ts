import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/decorators/current-user.decorator';
import { PublicRoute } from 'modules/decorators/is-public-route.decorator';

import { AuthUserBo } from '../bos/auth.bo';
import { AuthSignInDto, AuthSignUpDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('sign-in')
  signIn(@Body() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }

  @PublicRoute()
  @Post('sign-up')
  signUp(@Body() dto: AuthSignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiBearerAuth()
  @Get('profile')
  readProfile(@CurrentUser() user: AuthUserBo) {
    return user;
  }
}
