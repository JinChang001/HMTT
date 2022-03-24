// 同一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面,导入这个接口方法,就能发请求
// 好处: 请求rul路径, 可以统一管理
import axios from '@/utils/request'

// 登录- 登录接口
// axios内部, 会把参数对象转成json字符串格式后发给后台
// axios内部, 会自动携带请求参数(headers)里Content-Type: 'application/json'
export const loginAPI = ({ mobile, code }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 频道-获取所有频道
export const getAllChannelsAPI = () => {
  return axios({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
