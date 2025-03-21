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

// beforeAll(async () => {});
// afterAll(async () => {});

describe('Todo Resolvers', () => {
  it('should create a new todo', async () => {
    const response = await server.executeOperation({
      query: `
        mutation CreateTodo($uuid: String!, $editKey: String!, $content: [ContentInput!]!) {
          createTodo(uuid: $uuid, editKey: $editKey, content: $content) { status }
        }
      `,
      variables: {
        uuid: v4(),
        editKey: '1234',
        content: [{ id: new Date().getTime(), text: 'New Todo', completed: false }],
      },
    });

    const data = response.body['singleResult'].data;
    expect(data).toBeDefined();
    expect(data.status).toBe(201);
  });

  //update

  //delete - soft deleted
});