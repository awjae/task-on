import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql', // GraphQL 서버 엔드포인트
  documents: ['apps/task-on/app/**/*.ts', 'apps/task-on/app/**/*.tsx'], // 해당 앱 내 GraphQL 문서만 스캔
  generates: {
    'apps/task-on/graphql-codegen/generated.ts': { // 생성된 타입의 저장 위치
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
