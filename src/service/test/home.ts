import MYRequest from '..'

// 发送网络请求
// hyRequest.post
interface IHomeData {
  data: any
  returnCode: string
  success: boolean
}

MYRequest.request<IHomeData>({
  url: '/home/multidata'
}).then((res) => {
  console.log(res.data, res.success, res.returnCode)
})
interface IHighScoreData {
  list: any[]
  subtitle: string
  title: string
  type: string
  _id: string
}
MYRequest.get<IHighScoreData>({
  url: '/home/highscore',
  interceptors: {
    // 单个请求拦截器
    requestSuccessFn: (config) => {
      console.log('/home/highscore请求成功的拦截')
      return config
    },
    responseSuccessFn: (res) => {
      console.log('/home/highscore响应成功的拦截')
      return res
    }
  }
}).then((res) => {
  console.log(res.list, res.subtitle, res.title)
})
