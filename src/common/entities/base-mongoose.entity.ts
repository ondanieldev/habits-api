import { Prop, Schema } from '@nestjs/mongoose';

import { BaseEntity } from './base.entity';

@Schema({
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
})
export class BaseMongooseEntity implements BaseEntity {
  @Prop({ type: Date, required: true, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt: Date | null;

  id: string;

  _id: string;

  __v: number;
}
