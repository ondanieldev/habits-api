import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthUserBo } from 'modules/auth/bos/auth.bo';
import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import {
  CreateCompletedTaskDto,
  ReadCompletedTaskDto,
} from '../dtos/completed-task.dto';
import { CompletedTaskService } from '../services/completed-task.service';

@Injectable()
@ApiTags('Completed Tasks')
@Controller('tasks/completed')
export class CompletedTaskController {
  constructor(private completedTaskService: CompletedTaskService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: AuthUserBo,
    @Body() data: CreateCompletedTaskDto,
  ) {
    return this.completedTaskService.create({
      data,
      userId: user.sub,
    });
  }

  @ApiBearerAuth()
  @Get()
  async readList(
    @CurrentUser() user: AuthUserBo,
    @Query() { limit, page, ...data }: ReadCompletedTaskDto,
  ) {
    return this.completedTaskService.readList({
      data: { ...data, task: { userId: user.sub } },
      pagination: { limit, page },
      order: { year: 'ASC', month: 'ASC', day: 'ASC' },
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@CurrentUser() user: AuthUserBo, @Param('id') id: string) {
    return this.completedTaskService.delete({ id, userId: user.sub });
  }
}
