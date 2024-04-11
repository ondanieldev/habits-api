import { MongooseModule } from '@nestjs/mongoose';

import { mongodbFactory } from './factories/mongodb.factory';

export const MongodbModule = MongooseModule.forRootAsync({
  useFactory: mongodbFactory,
});
