import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

import { baseMongooseSchemaOptions } from 'common/constants/mongoose.constants';
import { BaseMongooseEntity } from 'common/entities/base-mongoose.entity';

import { UserEntity } from './user.entity';

@Schema({
  collection: 'users',
  ...baseMongooseSchemaOptions(UserMongooseEntity),
})
export class UserMongooseEntity
  extends BaseMongooseEntity
  implements UserEntity
{
  @Prop({ required: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;
}

export const UserMongooseSchema =
  SchemaFactory.createForClass(UserMongooseEntity);
