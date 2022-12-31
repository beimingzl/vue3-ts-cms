// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://example.dev:8000'
// export const BASE_URL = 'http://example.prod:8000'
// export const TIME_OUT = 10000

// 2. 代码逻辑判断，动态判断当前环境 (vite默认提供的环境变量)
/**
 *  import.meta.env.DEV 是否为开发环境
 *  import.meta.env.PROD 是否为生产环境
 *  import.meta.env.SSR 是否为服务端渲染( server side render)
 */

let BASE_URL = ''
let ENV = ''
let TIME_OUT = 1000
// if (import.meta.env.DEV) {
//   ENV = 'DEV'
//   BASE_URL = 'http://example.dev:8000'
// } else if (import.meta.env.PROD) {
//   ENV = 'PROD'
//   BASE_URL = 'http://example.prod:8000'
// } else if (import.meta.env.SSR) {
//   ENV = 'SSR'
//   BASE_URL = 'http://example.ssr:8000'
// }

// 3. 通过创建 .env 文件直接创建变量(.env/.env.development/.env.production)
BASE_URL = import.meta.env.VITE_BASE_URL
ENV = import.meta.env.VITE_ENV
TIME_OUT = import.meta.env.VITE_TIME_OUT

console.log('当前环境：', ENV, BASE_URL, TIME_OUT)

export { BASE_URL, TIME_OUT }
