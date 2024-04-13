import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import {
  OffsetPaginated,
  OffsetPaginationBo,
} from '../bos/offset-pagination.bo';
import { OrderBo } from '../bos/order.bo';
import { OffsetPaginationUtils } from '../utils/offset-pagination.utils';
import { BaseRepository } from './base.repository';

@Injectable()
export class BaseTypeormRepository<
  TTypeormEntity extends TEntity,
  TEntity extends object,
  TCreate extends object,
  TFind extends object = Partial<TEntity>,
  TRelations extends string[] = [],
> implements BaseRepository<TEntity, TCreate, TFind, TRelations>
{
  protected readonly ormRepository: Repository<TTypeormEntity>;
  protected readonly offsetPaginationUtils = new OffsetPaginationUtils();

  constructor(
    protected readonly dataSource: DataSource,
    protected readonly TypeormEntity: EntityTarget<TTypeormEntity>,
  ) {
    this.ormRepository =
      dataSource.getRepository<TTypeormEntity>(TypeormEntity);
  }

  public async create(data: TCreate): Promise<TEntity> {
    const entity = this.ormRepository.create(
      data as unknown as DeepPartial<TTypeormEntity>,
    );
    await this.ormRepository.save(entity);
    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async find({
    data,
    relations,
  }: {
    data: TFind | TFind[];
    relations?: TRelations;
  }): Promise<TEntity | null> {
    const entity = await this.ormRepository.findOne({
      where: data as FindOptionsWhere<TTypeormEntity>,
      relations,
    });
    if (!entity) return null;
    return entity;
  }

  public async findMany({
    data,
    order,
    pagination,
    relations,
  }: {
    data: TFind | TFind[];
    pagination?: OffsetPaginationBo;
    order?: OrderBo<TEntity>;
    relations?: TRelations;
  }): Promise<OffsetPaginated<TEntity>> {
    const [items, total] = await this.ormRepository.findAndCount({
      where: data as FindOptionsWhere<TTypeormEntity>,
      take: this.offsetPaginationUtils.getLimit(pagination),
      skip: this.offsetPaginationUtils.getOffset(pagination),
      order: order as FindOptionsOrder<TTypeormEntity>,
      relations,
    });

    return {
      items,
      total,
    };
  }

  public async save(entity: TEntity): Promise<TEntity> {
    await this.ormRepository.save(entity as TTypeormEntity);
    return entity;
  }

  public async softDelete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async update({
    findData,
    updateData,
  }: {
    findData: TFind;
    updateData: Partial<TEntity>;
  }): Promise<TEntity[]> {
    const entity = await this.ormRepository.update(
      findData as FindOptionsWhere<TTypeormEntity>,
      updateData as QueryDeepPartialEntity<TTypeormEntity>,
    );
    return entity.generatedMaps as TEntity[];
  }
}
