import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { postgresqlConfig } from '../constants/postgresl.constant';

export const postgresqlFactory = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: postgresqlConfig.host,
    port: postgresqlConfig.port ? Number(postgresqlConfig.port) : undefined,
    username: postgresqlConfig.username,
    password: postgresqlConfig.password,
    database: postgresqlConfig.database,
    autoLoadEntities: true,
  };
};
