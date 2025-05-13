import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { LoggerService } from '../common/logging/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  providers: [TodoService, TodoResolver, LoggerService],
})
export class TodoModule {}
