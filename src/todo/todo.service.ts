import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Tasks.name) private readonly model: Model<Tasks>) {}
  create(createTodoDto: CreateTodoDto) {
    let date = new Date();
    const task = this.model.create({
      ...createTodoDto,
      createdAt: date.getTime(),
    });
    return task;
  }

  findAll() {
    const allTasks = this.model.find({}, { task: 1 });

    return allTasks;
  }

  findOne(id: string) {
    const singleTask = this.model.findOne({ _id: id });
    return singleTask;
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    const updateData = this.model.findByIdAndUpdate(id, updateTodoDto, {
      new: true,
    });
    return updateData;
  }

  remove(id: string) {
    const deletedTask = this.model.findByIdAndDelete(id);
    return deletedTask;
  }
}
