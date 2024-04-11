import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { BaseMongooseEntity } from 'common/entities/base-mongoose.entity';
import { BaseEntity } from 'common/entities/base.entity';

import { MongooseUtils } from 'providers/mongodb/utils/mongoose.utils';

import {
  OffsetPaginated,
  OffsetPaginationBo,
} from '../bos/offset-pagination.bo';
import { OrderBo } from '../bos/order.bo';
import { OffsetPaginationUtils } from '../utils/offset-pagination.utils';
import { BaseRepository } from './base.repository';

@Injectable()
export class BaseMongooseRepository<
  TMongooseEntity extends BaseMongooseEntity,
  TEntity extends BaseEntity,
  TCreate extends object,
> implements BaseRepository<TEntity, TCreate>
{
  protected readonly mongooseUtils = new MongooseUtils();
  protected readonly offsetPaginationUtils = new OffsetPaginationUtils();

  constructor(
    protected readonly Initializer: new () => TMongooseEntity,
    protected readonly model: Model<TMongooseEntity>,
  ) {}

  public async create(data: TCreate): Promise<TEntity> {
    let entity = new this.model(data);
    entity = await entity.save();
    return entity as unknown as TEntity;
  }

  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  public async find({
    data,
  }: {
    data: Partial<TEntity> | Partial<TEntity>[];
  }): Promise<TEntity | null> {
    const filter = this.mongooseUtils.getFilterFromData<
      TEntity,
      TMongooseEntity
    >(data);

    const entity = await this.model.findOne(filter).exec();

    if (!entity) return null;
    return entity as unknown as TEntity;
  }

  public async findMany({
    data,
    order,
    pagination,
  }: {
    data: Partial<TEntity> | Partial<TEntity>[];
    pagination?: OffsetPaginationBo;
    order?: OrderBo<TEntity>;
  }): Promise<OffsetPaginated<TEntity>> {
    const filter = this.mongooseUtils.getFilterFromData<
      TEntity,
      TMongooseEntity
    >(data);

    const items = await this.model
      .find(filter, null, {
        limit: this.offsetPaginationUtils.getLimit(pagination),
        skip: this.offsetPaginationUtils.getOffset(pagination),
        sort: this.mongooseUtils.getSortFromOrder(order),
      })
      .exec();

    const total = await this.model.countDocuments(filter);

    return {
      items: items.map((item) => item.toObject()) as TEntity[],
      total,
    };
  }

  public async save(entity: TEntity): Promise<TEntity> {
    const result = await this.model.findByIdAndUpdate(entity.id, entity);
    if (!result) {
      throw new Error('Entity not found');
    }
    return result as unknown as TEntity;
  }

  public async softDelete(): Promise<void> {
    throw new Error('Method not implemented');
  }

  public async update({}: {
    findData: Partial<TEntity>;
    updateData: Partial<TEntity>;
  }): Promise<TEntity[]> {
    throw new Error('Method not implemented');
  }
}
