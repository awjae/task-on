import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from 'graphql-tag';
import { IContent } from '../../_common/type';
import { connectDB, disconnectDB, Todo } from '@libs/mongoose';
import { createResponse } from '../_utils/response';

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
    updateCompletedTodo(uuid: String!, id: Float!, completed: Boolean!): String
    deleteTodoItem(uuid: String!, id: Float!): String
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

      return createResponse({
        message: '할 일이 성공적으로 저장되었습니다.',
        status: 201,
        success: true,
      });
    },
    updateCompletedTodo: async (_: unknown, {
      uuid, id, completed
    }: {
      uuid: string; id: number; completed: boolean;
    }) => {

      await connectDB();
      const updatedTodo = await Todo.findOneAndUpdate(
        { uuid, 'content.id': id },
        { $set: { 'content.$.completed': completed } },
        { new: true }
      );
      await disconnectDB();

      return updatedTodo ?
        createResponse({
          message: '할 일이 성공적으로 업데이트되었습니다.',
          status: 202,
          success: true,
        }) : createResponse({
          message: '할 일을 찾을 수 없습니다.',
          status: 204,
          success: false,
        });
    },
    deleteTodoItem: async (_: unknown, {
      uuid,
      id,
    }: {
      uuid: string;
      id: number;
    }) => {

      await connectDB();
      const todo = await Todo.findOne({ uuid });
      const itemIndex = todo?.content.findIndex((item) => item.id === id);
      if (!todo || !itemIndex || itemIndex === -1)
        return createResponse({
          message: '할 일을 찾을 수 없습니다.',
          status: 204,
          success: false,
        });

      const item = todo.content[itemIndex];
      if (item) {
        item.deleted = new Date();
        await todo.save();
      }
      await disconnectDB();

      return createResponse({
        message: '할 일이 성공적으로 삭제되었습니다.',
        status: 200,
        success: true,
      });
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