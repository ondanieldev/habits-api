import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskSanitizeService {
  sanitizeDaysOfWeek(daysOfWeek: number[]): string {
    return [...new Set(daysOfWeek)].join(',');
  }
}
