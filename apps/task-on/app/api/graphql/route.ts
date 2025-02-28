import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { TContent } from '../../_common/type';
import { connectDB, disconnectDB, Todo } from '@libs/mongoose';

const typeDefs = gql`
  type TTodos {
    uuid: String!
    editKey: String!
    content: [TContent!]!
  }

  type TContent {
    id: Int!
    text: String!
    completed: Boolean!
  }

  type Query {
    readTodos(uuid: String!): [TTodos]
  }

  type Mutation {
    createTodo(uuid: String!, editKey: String!, content: [ContentInput!]!): String
  }

  input ContentInput {
    id: Int!
    text: String!
    completed: Boolean!
  }
`;

const resolvers = {
  Query: {
    readTodos: async ({ uuid }: { uuid: string }) => {
      await connectDB();
      const todos = await Todo.find({ uuid });
      await disconnectDB();
      return todos;
    },
  },
  Mutation: {
    createTodo: async ({
      uuid, editKey, content
     }: {
      uuid: string; editKey: string; content: TContent[];
    }) => {
      await connectDB();
      const newTodo = new Todo({ uuid, editKey, content });
      await newTodo.save();
      await disconnectDB();
      return '할 일이 성공적으로 저장되었습니다.';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };