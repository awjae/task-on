import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql', // GraphQL 서버 엔드포인트
  documents: ['apps/task-on/src/app/**/*.ts', 'apps/task-on/src/app/**/*.tsx'],
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
