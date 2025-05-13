import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Todo, TodoSchema } from './todo/todo.entity';
import { TodoService } from './todo/todo.service';
import { TodoResolver } from './todo/todo.resolver';
import { LoggerService } from './common/logging/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/todos'),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'todos_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  providers: [TodoService, TodoResolver, LoggerService],
})
export class AppModule {}
