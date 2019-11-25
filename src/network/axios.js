import originAxios from 'axios'

export default function (config) {
  // 1.创建axios的实例
  const instance = originAxios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('来到了response拦截failure中');
    return err
  })

  // 3.发送真正的网络请求
  return instance(config)
}