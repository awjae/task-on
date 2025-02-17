module.exports = {
  extends: ['./browser.js'],
  plugins: [
    'react',
    'react-hooks',
  ],
  env: {},
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {},
  rules: {
    'jsx-quotes': ['warn', 'prefer-double'],
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useSubscription' }],
    'react-hooks/rules-of-hooks': ['error'],
    'react/function-component-definition': ['warn', { namedComponents: 'function-declaration' }],
    'react/jsx-closing-bracket-location': ['warn', { nonEmpty: 'after-props', selfClosing: 'line-aligned' }],
    'react/jsx-curly-brace-presence': ['warn', 'never'],
    'react/jsx-curly-newline': ['warn', { multiline: 'consistent', singleline: 'consistent' }],
    'react/jsx-curly-spacing': ['warn', { when: 'always', children: true }],
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-key': ['warn'],
    'react/jsx-no-useless-fragment': ['warn'],
    'react/jsx-pascal-case': ['warn'],
    'react/jsx-props-no-multi-spaces': ['warn'],
    'react/jsx-sort-props': ['warn', { callbacksLast: true, ignoreCase: true }],
    'react/jsx-tag-spacing': ['warn', { afterOpening: 'never', beforeClosing: 'never', beforeSelfClosing: 'always', closingSlash: 'never' }],
  },
  settings: {
    react: {
      version: 'detect',
    }
  }
};