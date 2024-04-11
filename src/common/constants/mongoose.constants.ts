import { SchemaOptions } from '@nestjs/mongoose';

export const baseMongooseSchemaOptions: SchemaOptions = {
  toObject: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
    },
    getters: true,
  },
  id: true,
  timestamps: true,
};
