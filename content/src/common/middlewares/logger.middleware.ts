import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger('loggerMiddleware');

  logger.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}
