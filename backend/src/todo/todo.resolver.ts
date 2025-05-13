import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true })
  async todo(@Args('id', { type: () => ID }) id: string): Promise<Todo | null> {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('input') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { nullable: true })
  async updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo | null> {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.todoService.remove(id);
  }
}
