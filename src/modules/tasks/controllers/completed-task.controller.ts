import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';
import { UserEntity } from 'modules/user/entities/user.entity';

import {
  CreateCompletedTaskDto,
  ReadCompletedTaskDto,
} from '../dtos/completed-task.dto';
import { CompletedTaskService } from '../services/completed-task.service';

@ApiTags('Completed Tasks')
@Controller('tasks/completed')
export class CompletedTaskController {
  constructor(private completedTaskService: CompletedTaskService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: UserEntity,
    @Body() data: CreateCompletedTaskDto,
  ) {
    return this.completedTaskService.create({
      data,
      userId: user.id,
    });
  }

  @ApiBearerAuth()
  @Get()
  async readList(
    @CurrentUser() user: UserEntity,
    @Query() { limit, page, ...data }: ReadCompletedTaskDto,
  ) {
    return this.completedTaskService.readList({
      data,
      order: { year: 'ASC', month: 'ASC', day: 'ASC' },
      pagination: { limit, page },
      userId: user.id,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@CurrentUser() user: UserEntity, @Param('id') id: string) {
    return this.completedTaskService.delete({ id, userId: user.id });
  }
}
