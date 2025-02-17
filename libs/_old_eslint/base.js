module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  parserOptions: {
    // NOTE: npm은 peer dependency를 flat하게 처리하므로 yarn 혹은 pnpm을 쓰던가
    // nx의 eslint plugin 버전, @typescript-eslint/*, typescript 버전을 다 맞춰야함. (Haze, 231023)
    warnOnUnsupportedTypeScriptVersion: false,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': ['error', {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }]
        }]
      }
    }, {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {}
    }, {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {}
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {}
    }
  ]
};