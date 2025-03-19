// eslint-disable-next-line import/no-anonymous-default-export
export default {
  displayName: 'task-on',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/task-on',
  transformIgnorePatterns: [
    // node_modules에서 변환할 패턴 추가
    '/node_modules/(?!use-local-storage-state|next-intl|use-intl)',
  ],
};
