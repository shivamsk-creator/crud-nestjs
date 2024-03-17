import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Tasks>;

@Schema()
export class Tasks {
  @Prop({ type: String, default: '' })
  task: string;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;

  @Prop({ type: Number, default: null })
  createdAt: number;

  @Prop({ type: Number, default: null })
  updatedAt: number;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
