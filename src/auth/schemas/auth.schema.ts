import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ type: String, default: '' })
  first_name: string;

  @Prop({ type: String, default: '' })
  last_name: string;

  @Prop({ type: String, default: '', required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;

export const UserModel = SchemaFactory.createForClass(Users);
