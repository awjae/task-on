import { Todo } from '@libs/mongoose';
import { IContent } from '../../../_common/type';

export const todoResolvers = {
  Query: {
    readTodo: async (_: unknown, { uuid }: { uuid: string }) => {
      const todoList = await Todo.findOne({ uuid });

      return {
        status: 200,
        data: todoList ?? null,
      };
    },
  },
  Mutation: {
    createTodo: async (_: unknown, {
      uuid, contents
     }: {
      uuid: string; contents: IContent[];
    }) => {
      let newTodo = new Todo({ uuid, contents, isShared: true });
      try {
        await newTodo.save();
      } catch (error: unknown) {
        const mongooseError = error as { code: number };

        // duplicated uuid error
        if(mongooseError.code === 11000) {
          const updateTodo = await Todo.findOneAndUpdate({ uuid }, { isShared: true, contents });
          if (!updateTodo)
            throw Error('생성 에러');

          newTodo = updateTodo;
        }
      }

      return {
        message: '할 일이 성공적으로 저장되었습니다.',
        status: 201,
        data: newTodo,
      };
    },
    createTodoItem: async (_: unknown, {
      uuid,
      content,
    }: {
      uuid: string;
      content: IContent;
    }) => {
      const updatedTodo = await Todo.findOneAndUpdate(
        { uuid },
        { $push: { 'contents': content } },
      );

      return updatedTodo ?
      {
        message: '할 일이 성공적으로 추가되었습니다.',
        status: 201,
      } : {
        message: '할 일을 찾을 수 없습니다.',
        status: 204,
      };
    },
    updateCompletedTodo: async (_: unknown, {
      uuid, id, completed
    }: {
      uuid: string; id: number; completed: boolean;
    }) => {
      const updatedTodo = await Todo.findOneAndUpdate(
        { uuid, 'contents.id': id },
        { $set: { 'contents.$.completed': completed } },
        { new: true }
      );

      return updatedTodo ?
        {
          message: '할 일이 성공적으로 업데이트되었습니다.',
          status: 202,
        } : {
          message: '할 일을 찾을 수 없습니다.',
          status: 204,
        };
    },
    updateTodo: async (_: unknown, { uuid, operations }: { uuid: string; operations: object}) => {
      if (!operations || Object.keys(operations).length === 0)
        throw new Error('No fields to update');

      const updatedItem = await Todo.findByIdAndUpdate(
        uuid,
        { $set: operations },
        { new: true, runValidators: true }
      );

      if (!updatedItem)
        throw new Error('Item not found');

      return {
          message: '할 일이 성공적으로 업데이트되었습니다.',
          status: 200,
          data: updatedItem
        };
    },
    deleteTodoItem: async (_: unknown, {
      uuid,
      id,
    }: {
      uuid: string;
      id: number;
    }) => {
      const todo = await Todo.findOneAndUpdate(
        { uuid, 'contents.id': id },
        { $set: { 'contents.$.deleted': new Date() } },
        { new: true }
      );

      if (!todo)
        return {
          message: '할 일을 찾을 수 없습니다.',
          status: 204,
        };

      return {
        message: '할 일이 성공적으로 삭제되었습니다.',
        status: 200,
      };
    },
  },
};