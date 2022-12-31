import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { MYRequestConfig } from './type'

/**
 * 对 Axios 进行二次封装 -  精细化控制
 * 功能：
 * 1.所有实例拦截器：蒙版Loading/token/修改配置
 * 2.单个实例拦截器
 * 3.单个请求拦截器
 * 4.响应结果的类型处理(泛型)
 */
class MYRequest {
  instance: AxiosInstance

  // 创建实例
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)

    // 每个 instance 实例都添加 拦截器
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // 全局请求成功拦截器
        return config
      },
      (err) => {
        // 全局请求失败拦截器
        return err
      }
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 全局响应成功拦截器
        return res.data
      },
      (err) => {
        // 全局响应失败拦截器
        return err
      }
    )

    // 实例独有拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => Data
  request<T = any>(config: MYRequestConfig<T>) {
    // 单次请求的成功拦截
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    // 单次请求失败拦截
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: MYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MYRequest
