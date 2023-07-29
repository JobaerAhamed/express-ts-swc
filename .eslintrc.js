const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

const pathAliases = Object.keys(paths)
  .map((key) => key.replace(/[^A-Za-z]+/g, ''))
  .join('|');

module.exports = {
  root: true,
  extends: 'secure-typescript',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^\\u0000'],
              ['^react', '^@?\\w'],
              [`^@(${pathAliases})(/.*|$)`],
              ['^\\.'],
            ],
          },
        ],
        'unicorn/prevent-abbreviations': 0,
        'security/detect-object-injection': 0,
      },
    },
  ],
};
