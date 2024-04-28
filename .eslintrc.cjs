module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: "tsconfig.json"
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier'],
  extends: ['airbnb/base',  'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-shadow": "off",
    'class-methods-use-this': 'off',
}
};