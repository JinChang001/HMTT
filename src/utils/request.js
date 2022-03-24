// 基于axios封装网络请求
import theAxios from 'axios'

const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 // 设置20秒超时时间
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  // 用axios
  return axios({
    url,
    method,
    params,
    data,
    headers
  })

  // 用ajax
  // return new Promise((resolve, reject) =>{
  //   $.ajax({
  //     url,
  //     data,
  //     headers,
  //     type: method,
  //     success: (res) => {
  //       resolve(res)
  //     },
  //     error: (res) => {
  //       reject(res)
  //     }
  //   })
  // })
}
