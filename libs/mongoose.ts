import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const mongoURI = 'mongodb://admin:admin@localhost:27017/todo-on-mongo?authSource=admin';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log('✅ MongoDB 연결 성공!');
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error);
    process.exit(1);
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
  expiresAt: { type: Date }, // 만료 시간 (선택)
});

// 🔐 편집 비밀번호 해싱 (저장 전)
todoSchema.pre('save', async function (next) {
  if (this.isModified('editKey') && this.editKey) {
    const saltRounds = 10;
    this.editKey = await bcrypt.hash(this.editKey, saltRounds);
  }
  next();
});

// 🔑 비밀번호 검증 메서드
todoSchema.methods['compareEditKey'] = async function (inputKey: string) {
  return await bcrypt.compare(inputKey, this['editKey']);
};

export const Todo =  mongoose.model('todo', todoSchema);