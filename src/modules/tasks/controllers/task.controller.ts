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

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';
import { UserEntity } from 'modules/user/entities/user.entity';

import { CreateTaskDto } from '../dtos/task.dto';
import { TaskService } from '../services/task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @Post()
  async create(@CurrentUser() user: UserEntity, @Body() data: CreateTaskDto) {
    return this.taskService.create({ ...data, userId: user.id });
  }

  @ApiBearerAuth()
  @Get()
  async readList(
    @CurrentUser() user: UserEntity,
    @Query() query: OffsetPaginationDto,
  ) {
    return this.taskService.readList({
      data: {},
      userId: user.id,
      pagination: query,
      order: { hours: 'ASC', minutes: 'ASC' },
    });
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @CurrentUser() user: UserEntity,
    @Param('id') id: string,
    @Body() data: CreateTaskDto,
  ) {
    return this.taskService.update({
      data,
      id,
      userId: user.id,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@CurrentUser() user: UserEntity, @Param('id') id: string) {
    return this.taskService.delete({ id, userId: user.id });
  }
}
