import { ApolloServer } from '@apollo/server';
import { commonTypeDefs } from '../type/common';
import { todoTypeDefs } from '../type/todo';
import { todoResolvers } from '../resolvers/todo';
import { gql } from 'graphql-tag';
import { v4 } from 'uuid';
import { createTodoQuery, deleteTodoItemQuery, updateTodoItemQuery } from '../queries/todo';
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

const tempEditKey = '1234';

beforeAll(async () => {
  await mongoose.connect(mongoURI);
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
        editKey: tempEditKey,
        content: [{ id: new Date().getTime(), text: 'New Todo', completed: false }],
      },
    });

    const data = response.body['singleResult'].data;
    expect(data.createTodo).toBeDefined();
    expect(data.createTodo.status).toBe(201);
  });

  it('should update(complete) todo', async () => {
    const uuid = v4();
    const id = new Date().getTime();

    await server.executeOperation({
      query: createTodoQuery,
      variables: {
        uuid,
        editKey: tempEditKey,
        content: [{ id, text: 'Test Todo', completed: false }],
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
        editKey: tempEditKey,
        content: [{ id, text: 'Todo to Delete', completed: false }],
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
});
