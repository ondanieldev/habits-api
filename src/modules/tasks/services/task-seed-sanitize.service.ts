import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskSeedSanitizeService {
  sanitizeDaysOfWeek(daysOfWeek: number[]): string {
    return [...new Set(daysOfWeek)].join(',');
  }
}
