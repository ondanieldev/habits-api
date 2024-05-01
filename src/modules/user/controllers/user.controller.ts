import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { ReadAllUsersDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/')
  readUsers(@Query() _dto: ReadAllUsersDto) {
    // TODO: create roles to allow only admins to retrieve user list
    throw new UnauthorizedException();
  }

  @ApiBearerAuth()
  @Get('profile')
  readProfile(@CurrentUser() user: UserEntity) {
    return user;
  }
}
