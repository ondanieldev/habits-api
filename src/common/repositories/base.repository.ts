import {
  OffsetPaginated,
  OffsetPaginationBo,
} from 'common/bos/offset-pagination.bo';
import { OrderBo } from 'common/bos/order.bo';

export class BaseRepository<
  TEntity extends object,
  TCreate extends object,
  TFind extends object = Partial<TEntity>,
  TRelations extends string[] = [],
> {
  create: (data: TCreate) => Promise<TEntity>;

  delete: (id: string) => Promise<void>;

  find: ({}: {
    data: TFind | TFind[];
    relations?: TRelations;
  }) => Promise<TEntity | null>;

  findMany: ({}: {
    data: TFind | TFind[];
    order?: OrderBo<TEntity>;
    pagination?: OffsetPaginationBo;
    relations?: TRelations;
  }) => Promise<OffsetPaginated<TEntity>>;

  save: (entity: TEntity) => Promise<TEntity>;

  softDelete: (id: string) => Promise<void>;

  update: ({}: {
    findData: TFind;
    updateData: Partial<TEntity>;
  }) => Promise<TEntity[]>;
}
