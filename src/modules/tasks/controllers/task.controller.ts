import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OffsetPaginationDto } from 'common/dtos/offset-pagination.dto';

import { AuthUserBo } from 'modules/auth/bos/auth.bo';
import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { CreateTaskDto } from '../dtos/task.dto';
import { TaskService } from '../services/task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @Post()
  async create(@CurrentUser() user: AuthUserBo, @Body() data: CreateTaskDto) {
    return this.taskService.create({ ...data, userId: user.sub });
  }

  @ApiBearerAuth()
  @Get()
  async readList(
    @CurrentUser() user: AuthUserBo,
    @Query() query: OffsetPaginationDto,
  ) {
    return this.taskService.readList({
      data: {},
      userId: user.sub,
      pagination: query,
      order: { hours: 'ASC', minutes: 'ASC' },
    });
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @CurrentUser() user: AuthUserBo,
    @Param('id') id: string,
    @Body() data: CreateTaskDto,
  ) {
    return this.taskService.update({
      data,
      id,
      userId: user.sub,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@CurrentUser() user: AuthUserBo, @Param('id') id: string) {
    return this.taskService.delete({ id, userId: user.sub });
  }
}
