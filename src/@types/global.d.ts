// @see https://github.com/vuejs/vue-class-component/issues/219
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// @see https://github.com/microsoft/TypeScript-React-Starter/issues/12
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}
