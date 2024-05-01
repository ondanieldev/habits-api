import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReadAllUsersDto } from '../dtos/user.dto';
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
}
