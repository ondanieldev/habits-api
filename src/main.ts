import 'dotenv/config';

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { validationPipe } from './common/pipes/validation.pipe';
import { AppModule } from './modules/app/app.module';
import { appConstants } from './modules/app/constants/app.constants';
import { openApiBootstrap } from './modules/open-api/open-api.bootstrap';

async function bootstrap() {
  // Setup application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setup logger
  const logger = new Logger('bootstrap');

  // Setup global middlewares
  app.use(helmet());
  app.enableCors();
  app.use(loggerMiddleware);

  // Setup global pipes
  app.useGlobalPipes(validationPipe);

  // Setup global prefix
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Setup OpenAPI
  openApiBootstrap(app);

  // Start the application
  const port = process.env.APP_PORT || appConstants.defaultPort;
  await app.listen(port, async () => {
    logger.log(`Application listening on port ${port}`);
  });
}
bootstrap();
