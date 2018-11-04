module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
  },
  env: {
    node: true
  },
  rules: {
    'no-console': 0
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
