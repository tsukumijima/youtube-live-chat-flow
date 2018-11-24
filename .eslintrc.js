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
    'plugin:vue/recommended'
  ],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
