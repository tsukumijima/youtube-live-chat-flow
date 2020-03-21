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

// @see https://github.com/GoogleChromeLabs/squoosh/blob/553a5041406976719522f9cf85af87be0810a99f/src/components/Output/custom-els/TwoUp/missing-types.d.ts#L34-L52
interface ResizeObserverCallback {
  (entries: ResizeObserverEntry[], observer: ResizeObserver): void
}

interface ResizeObserverEntry {
  readonly target: Element
  readonly contentRect: DOMRectReadOnly
}

interface ResizeObserver {
  observe(target: Element): void
  unobserve(target: Element): void
  disconnect(): void
}

declare let ResizeObserver: {
  prototype: ResizeObserver
  new (callback: ResizeObserverCallback): ResizeObserver
}
