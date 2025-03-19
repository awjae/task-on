import { IContent } from 'apps/task-on/src/app/_common/type';
import bcrypt from 'bcrypt';
import mongoose, { Query } from 'mongoose';

const mongoURI = process.env['MONGODB_URI'] || 'mongodb://admin:admin@localhost:27017/todo-on-mongo?authSource=admin';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log('✅ MongoDB 연결 성공!');
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB Disconnected!');
  } catch (error) {
    console.error('❌ MongoDB Disconnection Error:', error);
  }
};

const todoSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true }, // 공유용 UUID
  content: { type: Array, required: true }, // 투두리스트 데이터 (JSON 형태)
  editKey: { type: String }, // 편집용 비밀번호 (해시 저장)
  createdAt: { type: Date, default: Date.now }, // 생성 시간
  deletedAt: { type: Date, default: null } // 삭제된 시간 (소프트 삭제)
});

// 🔐 편집 비밀번호 해싱 (저장 전)
todoSchema.pre('save', async function (next) {
  if (this.isModified('editKey') && this.editKey) {
    const saltRounds = 10;
    this.editKey = await bcrypt.hash(this.editKey, saltRounds);
  }
  next();
});
// soft deleted 미들웨어 설정
todoSchema.pre(/^find/, function (next) {
  const query = this as Query<ITodo, ITodo>;
  query.where({ deletedAt: null });
  next();
});
// soft deleted 미들웨어 설정 (JSON 변환 시) - 대상이 todo가 아니라 content임
todoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret['content'] = ret['content'].filter((item: IContent) => !item.deleted);
    return ret;
  },
});

// 🔑 비밀번호 검증 메서드
todoSchema.methods['compareEditKey'] = async function (inputKey: string) {
  return await bcrypt.compare(inputKey, this['editKey']);
};

interface ITodo extends Document {
  uuid: string;
  content: IContent[];
  createdAt: Date;
  editKey?: string | null;
  deletedAt?: Date | null;
}

export const Todo = mongoose.models['todo'] as mongoose.Model<ITodo> || mongoose.model<ITodo>('todo', todoSchema);