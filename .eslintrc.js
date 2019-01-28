module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    chrome: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue'
  ]
}
