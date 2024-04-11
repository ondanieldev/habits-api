import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { openApiConstants } from './constants/open-api.constants';

export const openApiBootstrap = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(openApiConstants.description)
    .setDescription(openApiConstants.description)
    .setVersion(openApiConstants.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
