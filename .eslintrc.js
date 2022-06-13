module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime', // 兼容 jsx 新的语法
  ],
  parserOptions: {
    //parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {
    // 0 = off, 1 = warn, 2 = error
    'prettier/prettier': 'error',
  },
}
