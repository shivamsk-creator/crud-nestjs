import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;

export const UserModel = SchemaFactory.createForClass(Users);
