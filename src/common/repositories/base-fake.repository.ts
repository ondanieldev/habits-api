import { v4 } from 'uuid';

import {
  OffsetPaginated,
  OffsetPaginationBo,
} from '../bos/offset-pagination.bo';
import { OrderBo } from '../bos/order.bo';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from './base.repository';

export class BaseFakeRepository<
  TEntity extends BaseEntity,
  TCreate extends object,
  TFind extends object = Partial<TEntity>,
  TRelations extends string[] = [],
> implements BaseRepository<TEntity, TCreate, TFind, TRelations>
{
  protected items: TEntity[] = [];

  public async create(data: TCreate): Promise<TEntity> {
    const entity: TEntity = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...data,
    } as unknown as TEntity;
    this.items.push(entity);
    return entity;
  }

  private isMatch(entity: TEntity, findData: TFind | TFind[]): boolean {
    if (entity.deletedAt) {
      return false;
    }

    let match: boolean = true;

    const findDataArray = Array.isArray(findData) ? findData : [findData];

    for (const findData of findDataArray) {
      match = true;
      for (const [key, value] of Object.entries(findData)) {
        // TODO: refactor where on nested objects
        if (typeof value === 'object') {
          for (const [deepKey, deepValue] of Object.entries(value)) {
            const entityValue = entity[key as keyof TEntity] as Record<
              string,
              unknown
            >;
            const entityDeepValue = entityValue[deepKey];
            if (entityDeepValue !== deepValue) {
              match = false;
            }
          }
        } else {
          if (entity[key as keyof TEntity] !== value) {
            match = false;
          }
        }
      }
      if (match) {
        break;
      }
    }

    return match;
  }

  public async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }

  public async find(
    { data }: { data: TFind | TFind[]; relations: TRelations },
    // relations?: TRelations,
  ): Promise<TEntity | null> {
    const entity = this.items.find((item) => this.isMatch(item, data));
    if (!entity) return null;
    return entity;
  }

  public async findMany({
    data,
    pagination,
  }: {
    data: TFind | TFind[];
    pagination?: OffsetPaginationBo;
    order?: OrderBo<TEntity>;
    relations?: TRelations;
  }): Promise<OffsetPaginated<TEntity>> {
    const results = this.items.filter((item) => this.isMatch(item, data));

    const total = results.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || undefined;
    const startIndex = (page - 1) * (limit || 0);
    const endIndex = limit ? startIndex + limit : undefined;

    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      items: paginatedResults,
      total,
    };
  }

  public async save(entity: TEntity): Promise<TEntity> {
    const currentEntity = this.items.find((item) => item.id === entity.id);
    if (currentEntity) {
      Object.assign(currentEntity, entity);
    }
    if (!currentEntity) {
      throw new Error('Entity not found');
    }
    return currentEntity;
  }

  public async softDelete(id: string): Promise<void> {
    const entity = this.items.find((item) => item.id === id);
    if (entity) {
      entity.deletedAt = new Date();
    }
  }

  public async update({
    findData,
    updateData,
  }: {
    findData: TFind;
    updateData: Partial<TEntity>;
  }): Promise<TEntity[]> {
    const entities = this.items.filter((item) => this.isMatch(item, findData));
    for (const entity of entities) {
      Object.assign(entity, updateData);
    }
    return entities;
  }
}
