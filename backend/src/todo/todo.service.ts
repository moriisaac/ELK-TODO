import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { LoggerService } from '../common/logging/logger.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    private logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    this.logger.log('TodoService', 'Creating new todo', { input: createTodoInput });
    const createdTodo = new this.todoModel(createTodoInput);
    const todo = await createdTodo.save();
    await this.cacheManager.del('all_todos');
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    this.logger.log('TodoService', 'Fetching all todos');
    const cachedTodos = await this.cacheManager.get<Todo[]>('all_todos');
    if (cachedTodos) {
      this.logger.debug('TodoService', 'Returning cached todos');
      return cachedTodos;
    }
    const todos = await this.todoModel.find().exec();
    await this.cacheManager.set('all_todos', todos, 60000); // Cache for 1 minute
    return todos;
  }

  async findOne(id: string): Promise<Todo | null> {
    this.logger.log('TodoService', 'Fetching todo by id', { id });
    const cachedTodo = await this.cacheManager.get<Todo>(`todo_${id}`);
    if (cachedTodo) {
      this.logger.debug('TodoService', 'Returning cached todo', { id });
      return cachedTodo;
    }
    const todo = await this.todoModel.findById(id).exec();
    if (todo) {
      await this.cacheManager.set(`todo_${id}`, todo, 60000); // Cache for 1 minute
    }
    return todo;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo | null> {
    this.logger.log('TodoService', 'Updating todo', { id, input: updateTodoInput });
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoInput, { new: true })
      .exec();
    if (updatedTodo) {
      await this.cacheManager.del(`todo_${id}`);
      await this.cacheManager.del('all_todos');
    }
    return updatedTodo;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log('TodoService', 'Removing todo', { id });
    const result = await this.todoModel.findByIdAndDelete(id).exec();
    if (result) {
      await this.cacheManager.del(`todo_${id}`);
      await this.cacheManager.del('all_todos');
      return true;
    }
    return false;
  }
}
