import { Todo } from '@libs/mongoose';
import { IContent } from '../../../_common/type';

const errorMessage = {
  create: '생성 에러',
  noContents: '변경사항이 없습니다.',
  noAuth: '공유되지 않은 대상입니다.',
  notFound: '대상를 찾을 수 없습니다.',
};

const successMessage = {
  ['200']: '성공적으로 처리되었습니다.',
  ['201']: '할 일이 성공적으로 저장되었습니다.',
  ['202']: '할 일이 성공적으로 업데이트되었습니다.',
  ['204']: '할 일을 찾을 수 없습니다.',
};

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
          const updateTodo = await Todo.findOneAndUpdate(
            { uuid }, { $set: { isShared: true, contents }}
          );
          if (!updateTodo)
            throw Error(errorMessage.create);

          newTodo = updateTodo;
        }
      }

      return {
        message: successMessage[201],
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
        message: successMessage[201],
        status: 201,
      } : {
        message: successMessage[204],
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
          message: successMessage[202],
          status: 202,
        } : {
          message: successMessage[204],
          status: 204,
        };
    },
    updateTodo: async (_: unknown, {
      uuid,
      operations
    }: {
      uuid: string;
      operations: object
    }) => {
      // TODO: general 한 api를 개발한 것은 좋지만, valid field에 대한 것을 제한 하는 것이 필요할 듯

      if (!operations || Object.keys(operations).length === 0)
        throw new Error(errorMessage.noContents);

      if(Object.keys(operations).includes('isShared')) {
        const targetItem = await Todo.findOne({ uuid });
        if (targetItem && !targetItem.isShared)
          throw new Error(errorMessage.noAuth);
      }

      const updatedItem = await Todo.findOneAndUpdate(
        { uuid },
        { $set: operations },
        { new: true, runValidators: true }
      );

      if (!updatedItem)
        throw new Error(errorMessage.notFound);

      return {
          message:  successMessage[200],
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
        throw Error(errorMessage.notFound);

      return {
        message: successMessage[200],
        status: 200,
      };
    },
  },
};