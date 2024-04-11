import { SchemaOptions } from '@nestjs/mongoose';
import { ToObjectOptions } from 'mongoose';

export type BaseMongooseTransform = (
  Initializer: new () => object,
) => <THydratedDocumentType>(
  doc: THydratedDocumentType,
  ret: Record<string, any>,
  options: ToObjectOptions<THydratedDocumentType>,
) => any;

export type BaseMongooseSchemaOptions = (
  Initializer: new () => object,
) => SchemaOptions;

export const baseMongooseTransform: BaseMongooseTransform =
  (Initializer) => (_, ret) => {
    Object.setPrototypeOf(ret, Object.getPrototypeOf(new Initializer()));
  };

export const baseMongooseSchemaOptions: BaseMongooseSchemaOptions = (
  Initializer,
) => ({
  id: true,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    transform: baseMongooseTransform(Initializer),
  },
});
