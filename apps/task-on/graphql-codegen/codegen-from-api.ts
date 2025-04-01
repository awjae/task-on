import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/task-on/src/app/api/graphql/type/_graphql/*.graphql',
  generates: {
    'apps/task-on/graphql-codegen/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
