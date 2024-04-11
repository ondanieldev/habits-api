import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { OffsetPaginationDto } from 'common/dtos/offset-pagination.dto';

import { AuthUserBo } from 'modules/auth/bos/auth.bo';
import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';

import { CreateTaskSeedDto } from '../dtos/task-seed.dto';
import { TaskSeedService } from '../services/task-seed.service';

@Injectable()
@ApiTags('Task Seed')
@Controller('tasks/seeds')
export class TaskSeedController {
  constructor(private taskSeedService: TaskSeedService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @CurrentUser() user: AuthUserBo,
    @Body() data: CreateTaskSeedDto,
  ) {
    return this.taskSeedService.create({ ...data, userId: user.sub });
  }

  @ApiBearerAuth()
  @Get()
  async readList(
    @CurrentUser() user: AuthUserBo,
    @Query() query: OffsetPaginationDto,
  ) {
    return this.taskSeedService.readList({
      data: {},
      userId: user.sub,
      pagination: query,
      order: { startsAtSecond: 'ASC' },
    });
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(
    @CurrentUser() user: AuthUserBo,
    @Param('id') id: string,
    @Body() data: CreateTaskSeedDto,
  ) {
    return this.taskSeedService.update({
      data: { ...data, userId: user.sub },
      id,
    });
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@CurrentUser() user: AuthUserBo, @Param('id') id: string) {
    return this.taskSeedService.delete({ id, userId: user.sub });
  }
}
