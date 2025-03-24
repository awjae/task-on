import { ApolloServer } from '@apollo/server';
import { commonTypeDefs } from '../type/common';
import { todoTypeDefs } from '../type/todo';
import { todoResolvers } from '../resolvers/todo';
import { gql } from 'graphql-tag';
import { v4 } from 'uuid';

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

// TODO: client 쪽 gql 이랑 일치 모듈화 가능하지 않을까
const createQuery = `
  mutation CreateTodo($uuid: String!, $editKey: String!, $content: [ContentInput!]!) {
    createTodo(uuid: $uuid, editKey: $editKey, content: $content) { status }
  }
`;
const updateQuery = `
  mutation UpdateCompletedTodo($uuid: String!, $id: Int!, $completed: Boolean!) {
    updateCompletedTodo(uuid: $uuid, id: $id, completed: $completed) { status }
  }
`;

// beforeAll(async () => {});
// afterAll(async () => {});

describe('Todo Resolvers', () => {
  it('should create a new todo', async () => {
    const response = await server.executeOperation({
      query: createQuery,
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
      query: createQuery,
      variables: {
        uuid,
        editKey: tempEditKey,
        content: [{ id, text: 'Test Todo', completed: false }],
      },
    });

    const response = await server.executeOperation({
      query: updateQuery,
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

  //delete - soft deleted
});