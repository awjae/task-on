import { connectDB, disconnectDB, Todo } from '@libs/mongoose';
import { createResponse } from '../_utils/reponse';

export type todoParams = {
  uuid: string;
  editKey: string;
  content: Array<{ id: number, text: string, completed: boolean }>;
}

export async function POST(request: Request) {
  const { uuid, editKey, content }: todoParams = await request.json();

  if (!uuid || !editKey || !Array.isArray(content)) {
    return createResponse('유효하지 않은 입력입니다.', false, 400);;
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

    return createResponse('할 일이 성공적으로 저장되었습니다.', true, 201);;
  } catch {
    return createResponse('서버 오류가 발생했습니다.', false, 500);
  }
}
