import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { EmailNotVerifiedRoute } from 'modules/user/decorators/is-email-not-verified-route.decorator';
import { UserTokenEntity } from 'modules/user/entities/user-token.entity';

import { CurrentUserToken } from '../decorators/current-user-token.decorator';
import { PublicRoute } from '../decorators/is-public-route.decorator';
import { AuthSignInDto, AuthSignUpDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @EmailNotVerifiedRoute()
  @Post('sign-in')
  signIn(@Body() dto: AuthSignInDto) {
    return this.authService.signIn(dto);
  }

  @PublicRoute()
  @EmailNotVerifiedRoute()
  @Post('sign-up')
  signUp(@Body() dto: AuthSignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiBearerAuth()
  @EmailNotVerifiedRoute()
  @Post('sign-out')
  signOut(@CurrentUserToken() userToken: UserTokenEntity) {
    return this.authService.signOut(userToken);
  }

  @ApiBearerAuth()
  @EmailNotVerifiedRoute()
  @Get('ping')
  readProfile() {}
}
