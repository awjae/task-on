import { connectDB, Todo, disconnectDB } from '@libs/mongoose';
import { IContent } from '../../../_common/type';
import { createResponse } from '../../_utils/response';

export const todoResolvers = {
  Query: {
    readTodo: async (_: unknown, { uuid }: { uuid: string }) => {
      await connectDB();
      const todos = await Todo.find({ uuid });
      await disconnectDB();
      return createResponse({
        status: 200,
        data: todos ?? [],
      });
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
        }) : createResponse({
          message: '할 일을 찾을 수 없습니다.',
          status: 204,
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
      });
    },
  },
};