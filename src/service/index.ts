import { BASE_URL, TIME_OUT } from './config'
import MYRequest from './request'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors:{}  可以传入该实例的拦截器
})

export default myRequest
