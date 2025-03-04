import { connectDB, disconnectDB, Todo } from '@libs/mongoose';
import { createResponse } from '../_utils/reponse';

export interface ITodoParams {
  uuid: string;
  editKey: string;
  content: Array<{ id: number, text: string, completed: boolean }>;
}

/** @deprecated nextjs vanilla api 방식 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');

  if (!uuid) {
    return createResponse({
      message: 'uuid가 필요합니다.',
      status: 400,
      success: false,
    });
  }

  try {
    await connectDB();
    const todos = await Todo.find({ uuid });
    await disconnectDB();

    if (todos.length === 0) {
      return createResponse({
        message: '할 일이 없습니다.',
        status: 404,
        success: false,
      });
    }
    return createResponse({
      status: 200,
      success: true,
      data: { todos },
    });
  } catch (error) {
    console.error('서버 오류:', error);
    return createResponse({
      message: '서버 오류가 발생했습니다.',
      status: 500,
      success: false,
    });
  }
}

export async function POST(request: Request) {
  const { uuid, editKey, content }: ITodoParams = await request.json();

  if (!uuid || !editKey || !Array.isArray(content)) {
    return createResponse({
      message: '유효하지 않은 입력입니다.',
      status: 400,
      success: false,
    });;
  }

  try {
    await connectDB();

    const newTodo = new Todo({
      uuid,
      editKey: editKey,
      content,
    });
    await newTodo.save();

    await disconnectDB();

    return createResponse({
      message: '할 일이 성공적으로 저장되었습니다.',
      status: 201,
      success: true,
    });
  } catch {
    return createResponse({
      message: '서버 오류가 발생했습니다.',
      status: 500,
      success: false,
    });
  }
}
