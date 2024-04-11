import { Types, FilterQuery } from 'mongoose';

import { OrderBo } from 'common/bos/order.bo';
import { BaseMongooseEntity } from 'common/entities/base-mongoose.entity';
import { BaseEntity } from 'common/entities/base.entity';

export class MongooseUtils {
  replaceIdByObjectId<TEntity extends BaseEntity>(
    data: Partial<TEntity>,
  ): Partial<TEntity> {
    if (!data.id) {
      return data;
    }

    const _id = new Types.ObjectId(data.id);

    delete data.id;

    return {
      _id,
      ...data,
    };
  }

  getFilterFromData<
    TEntity extends BaseEntity,
    TMongooseEntity extends BaseMongooseEntity,
  >(data: Partial<TEntity> | Partial<TEntity>[]): FilterQuery<TMongooseEntity> {
    if (Array.isArray(data) && data.length === 0) {
      return {};
    }

    if (Array.isArray(data) && data.length >= 1) {
      // @ts-expect-error TODO: I don't know why ts is emitting this error
      return {
        $or: data.map((item) => this.replaceIdByObjectId(item)) as Array<
          FilterQuery<TMongooseEntity>
        >,
      };
    }

    return this.replaceIdByObjectId(
      data as Partial<TEntity>,
    ) as FilterQuery<TMongooseEntity>;
  }

  getSortFromOrder<TEntity>(order?: OrderBo<TEntity>) {
    if (!order) {
      return null;
    }

    return Object.entries(order).map(([key, value]) => [
      key,
      value === 'ASC' ? 1 : -1,
    ]);
  }
}
