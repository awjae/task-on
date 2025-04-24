import { ApolloServer } from '@apollo/server';
import { commonTypeDefs } from '../type/common';
import { todoTypeDefs } from '../type/todo';
import { todoResolvers } from '../resolvers/todo';
import { gql } from 'graphql-tag';
import { v4 } from 'uuid';
import {
  createTodoItemQuery, createTodoQuery, deleteTodoItemQuery, updateTodoItemQuery,
  updateTodoQuery
} from '../queries/todo.ts';
import mongoose from 'mongoose';

const mongoURI = process.env['TEST_MONGODB_URI'] ?? '';

const typeDefs = gql`
  ${commonTypeDefs}
  ${todoTypeDefs}
`;

const resolvers = {
  ...todoResolvers
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

beforeAll(async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch  {
    console.log('Docker Container 확인');
  }
});
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Todo Resolvers', () => {
  it('should create a new todo', async () => {
    const response = await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid: v4(),
        contents: [{ id: new Date().getTime(), text: 'New Todo', completed: false }],
      },
    });

    const data = response.body['singleResult'].data;
    expect(data.createTodo).toBeDefined();
    expect(data.createTodo.status).toBe(201);
  });

  it('should create a new in todo', async () => {
    const uuid = v4();
    const id = new Date().getTime();

    await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid,
        contents: [{ id, text: 'Test Todo', completed: false }],
      },
    });

    const response = await server.executeOperation({
      query: createTodoItemQuery,
      variables: {
        uuid,
        content: { id, text: 'Test Todo 2', completed: false },
      },
    });

    const data = response.body['singleResult'].data;
    expect(data.createTodoItem).toBeDefined();
    expect(data.createTodoItem.status).toBe(201);
  });

  it('should update(complete) todo', async () => {
    const uuid = v4();
    const id = new Date().getTime();

    await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid,
        contents: [{ id, text: 'Test Todo', completed: false }],
      },
    });

    const response = await server.executeOperation({
      query: updateTodoItemQuery,
      variables: {
        uuid,
        id,
        completed: true,
      },
    });

    const data = response.body['singleResult'].data;
    expect(data.updateCompletedTodo).toBeDefined();
    expect(data.updateCompletedTodo.status).toBe(202);
  });

  it('should delete a todo item', async () => {
    const uuid = v4();
    const id = new Date().getTime();

    await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid,
        contents: [{ id, text: 'Todo to Delete', completed: false }],
      },
    });

    const response = await server.executeOperation({
      query: deleteTodoItemQuery,
      variables: {
        uuid,
        id,
      },
    });

    const data = response.body['singleResult'].data;
    expect(data.deleteTodoItem).toBeDefined();
    expect(data.deleteTodoItem.status).toBe(200);
  });

  it('should update using operation todo', async () => {
    const uuid = v4();

    await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid,
        contents: [{ id: new Date().getTime(), text: 'New Todo', completed: false }],
      },
    });

    const response1 = await server.executeOperation({
      query: updateTodoQuery,
      variables: {
        uuid,
        operations: {
          'isShared': false,
        }
      },
    });

    const data1 = response1.body['singleResult'].data;
    expect(data1.updateTodo).toBeDefined();
    expect(data1.updateTodo.status).toBe(200);
    expect(data1.updateTodo.data.isShared).toBe(false);

    const response2 = await server.executeOperation({
      query: updateTodoQuery,
      variables: {
        uuid,
        operations: {
          'contents': [{ id: new Date().getTime(), text: 'New Todo', completed: false }],
        }
      },
    });

    const data2 = response2.body['singleResult'].data;
    expect(data2.updateTodo).toBeDefined();
    expect(data2.updateTodo.status).toBe(200);
    expect(data2.updateTodo.data.isShared).toBe(false);

  });
});
