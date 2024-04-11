import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => instanceToPlain(this.transform(data))));
  }

  transform(data: any) {
    return Array.isArray(data)
      ? data.map((obj) => obj.toObject())
      : data.toObject();
  }
}
