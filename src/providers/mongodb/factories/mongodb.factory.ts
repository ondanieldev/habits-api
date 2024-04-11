import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { mongodbConfig } from '../constants/mongodb.constant';

export const mongodbFactory = (): MongooseModuleFactoryOptions => {
  const { pass, uri, user, dbName } = mongodbConfig();

  return {
    uri,
    user,
    pass,
    dbName,
  };
};
