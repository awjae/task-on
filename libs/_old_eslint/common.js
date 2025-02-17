module.exports = {
  extends: ['./base.js'],
  rules: {
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/ban-types': ['warn', {
      types: {
        'String': { message: 'Use string instead', fixWith: 'string' },
        'Number': { message: 'Use number instead', fixWith: 'number' },
        'Boolean': { message: 'Use boolean instead', fixWith: 'boolean' },
        'object': { message: 'Use {} instead', fixWith: '{}' },
        '{}': false
      }
    }],
    '@typescript-eslint/brace-style': ['warn', '1tbs', { allowSingleLine: false }],
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'explicit' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/func-call-spacing': ['warn'],
    '@typescript-eslint/indent': ['warn', 4, {
      ArrayExpression: 'off',
      CallExpression: { arguments: 1 },
      flatTernaryExpressions: true,
      FunctionDeclaration: { body: 1, parameters: 1 },
      ignoredNodes: ['ConditionalExpression'],
      MemberExpression: 'off',
      SwitchCase: 1,
      VariableDeclarator: 1
    }],
    '@typescript-eslint/keyword-spacing': ['warn', {
      before: true,
      after: true,
      overrides: {
        if: { after: false },
        for: { after: false },
        switch: { after: false },
        while: { after: false },
        catch: { after: false, }
      }
    }],
    '@typescript-eslint/member-delimiter-style': ['warn', { singleline: { requireLast: true } }],
    '@typescript-eslint/member-ordering': ['warn', {
      default: {
        memberTypes: [
          'static-field',
          'static-method',
          'readonly-field',
          'field',
          'constructor',
          'signature',
          'method',
        ],
        order: 'natural-case-insensitive',
      },
    }],
    // https://typescript-eslint.io/rules/naming-convention/
    '@typescript-eslint/naming-convention': ['warn',

      { selector: 'enumMember', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
      { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },

      // Type류는 앞에 T를 붙임
      // { selector: 'typeAlias',     format: ['PascalCase'], prefix: ['T'] },
      { selector: 'typeParameter', format: ['PascalCase'], prefix: ['T'] },

      // styled component를 위해 PascalCase를 허용
      { selector: 'variable', format: ['camelCase', 'PascalCase'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },

      // destructure된 변수는 모든 컨벤션 허용
      { selector: 'parameter', modifiers: ['destructured'], format: null },
      { selector: 'variable', modifiers: ['destructured'], format: null },

      // 비동기 함수에 async 붙이기
      { selector: 'function', modifiers: ['async'], format: ['camelCase'], suffix: ['Async'] },
      { selector: 'variable', modifiers: ['async'], format: ['camelCase'], suffix: ['Async'] },

      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'default', format: ['camelCase'] },

      // Entity의 _type property를 위해 예외 처리
      { selector: 'property', format: ['camelCase'], leadingUnderscore: 'allow', filter: { regex: '^_type$', match: true } },

      { selector: 'import', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },

    ],
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-base-to-string': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-empty-function': ['warn', { allow: [] }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-for-in-array': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unnecessary-condition': ['warn', { allowConstantLoopConditions: true }],
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    '@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/sort-type-constituents': ['warn', {}],
    '@typescript-eslint/space-before-blocks': 'warn',
    '@typescript-eslint/space-infix-ops': 'warn',
    '@typescript-eslint/strict-boolean-expressions': ['warn', {
      allowNullableBoolean: true,
      allowNullableEnum: true,
      allowNullableObject: true,
    }],
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    '@typescript-eslint/type-annotation-spacing': ['warn', {
      before: false,
      after: true,
      overrides: {
        arrow: { before: true, after: true }
      }
    }],
    'array-bracket-spacing': ['warn', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': ['warn'],
    'block-spacing': ['warn', 'always'],
    'brace-style': 'off', // use @typescript-eslint/brace-style
    'comma-dangle': 'off', // use @typescript-eslint/comma-dangle
    'comma-spacing': ['warn'],
    'curly': ['warn', 'multi-or-nest', 'consistent'],
    'eol-last': 'warn',
    'eqeqeq': ['warn', 'always'],
    'func-call-spacing': 'off', // use @typescript-eslint/func-call-spacing
    'function-paren-newline': ['warn', 'multiline-arguments'],
    'guard-for-in': 'warn',
    'indent': 'off',
    'key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    }],
    'keyword-spacing': 'off',
    'max-depth': ['warn', 5],
    'max-len': ['warn', {
      code: 100,
      /**
       * '/* eslint-...' 과 '// eslint-...' 둘 다 커버
       */
      ignorePattern: '\\/(\\/|\\*)\\seslint-',
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true
    }],
    'max-params': ['warn', 3],
    'new-parens': 'warn',
    'no-case-declarations': 'off',
    'no-console': 'warn',
    'no-constant-condition': ['warn', { checkLoops: false }],
    'no-control-regex': 'off',
    'no-empty': 'warn',
    'no-empty-function': 'off',
    'no-empty-pattern': 'warn',
    'no-extra-parens': 'off', // use @typescript-eslint/no-extra-parens
    'no-extra-semi': 'off', // use @typescript-eslint/no-extra-semi
    'no-implicit-coercion': ['warn', { disallowTemplateShorthand: false }],
    'no-irregular-whitespace': ['warn', { skipStrings: false }],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-nested-ternary': 'warn',
    'no-restricted-globals': ['error',
      { name: 'close', message: 'Use local variable' },
      { name: 'isFinite', message: 'Use Number.isNaN()' },
      { name: 'isInteger', message: 'Use Number.isInteger()' },
      { name: 'isNaN', message: 'Use Number.isNaN()' },
      { name: 'isSafeInteger', message: 'Use Number.isSafeInteger()' },
      { name: 'NaN', message: 'Use Number.NaN' },
      { name: 'parseFloat', message: 'Use Number.parseFloat()' },
      { name: 'parseInt', message: 'Use Number.parseInt()' }
    ],
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'off',
    'no-use-before-define': 'warn',
    'no-whitespace-before-property': 'warn',
    'nonblock-statement-body-position': ['warn', 'below'],
    'object-curly-newline': 'warn',
    'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
    'one-var': ['warn', 'never'],
    'operator-linebreak': ['warn', 'after'],
    'prefer-const': 'warn',
    'quotes': 'off',
    'semi': 'off', // use @typescript-eslint/semi
    'semi-spacing': ['warn', { before: false, after: true }],
    'sort-keys': 'off',
    'space-in-parens': ['warn', 'never'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', {
      anonymous: 'never',
      asyncArrow: 'always',
      named: 'never'
    }],
    'space-infix-ops': 'warn',
    'switch-colon-spacing': 'warn',
    'use-isnan': 'off',
  },
  overrides: [{
    files: ['*.spec.ts', '*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }]
};