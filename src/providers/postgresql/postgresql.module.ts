import { TypeOrmModule } from '@nestjs/typeorm';

import { postgresqlFactory } from './factories/postgresql.factory';

export const PostgresqlModule = TypeOrmModule.forRootAsync({
  useFactory: postgresqlFactory,
});
