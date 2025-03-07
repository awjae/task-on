import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { IContent } from '../../_common/type';
import { connectDB, disconnectDB, Todo } from '@libs/mongoose';

const typeDefs = gql`
  type TTodoList {
    uuid: String!
    editKey: String!
    content: [TContent!]!
  }

  type TContent {
    id: Float!
    text: String!
    completed: Boolean!
  }

  input ContentInput {
    id: Float!
    text: String!
    completed: Boolean!
  }

  type Query {
    readTodo(uuid: String!): TTodoList!
  }

  type Mutation {
    createTodo(uuid: String!, editKey: String!, content: [ContentInput!]!): String
  }
`;

const resolvers = {
  Query: {
    readTodo: async (_: unknown, { uuid }: { uuid: string }) => {
      await connectDB();
      const todos = await Todo.find({ uuid });
      await disconnectDB();
      return todos ?? [];
    },
  },
  Mutation: {
    createTodo: async (_: unknown, {
      uuid, editKey, content
     }: {
      uuid: string; editKey: string; content: IContent[];
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
  introspection: true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => {
    return ({ req });
  },
});

export { handler as GET, handler as POST };