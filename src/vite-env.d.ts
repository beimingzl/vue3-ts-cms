/// <reference types="vite/client" />

// .vue 文件声明
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
