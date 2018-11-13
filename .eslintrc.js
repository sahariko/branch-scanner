module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
  },
  root: true,
  env: {
    node: true,
    es6: true
  },
  rules: {
    'no-console': 0,
    semi: 2
  },
  overrides: [
      {
          files: ['**/spec.js'],
          env: {
              mocha: true
          },
          globals: {
              expect: true
          }
      }
  ]
}
