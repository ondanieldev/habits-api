import { Controller, Get, Injectable, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReadAllUsersDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Injectable()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/')
  readUsers(@Query() dto: ReadAllUsersDto) {
    return this.userService.readAll(dto);
  }
}
