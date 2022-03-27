// 同一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面,导入这个接口方法,就能发请求
// 好处: 请求rul路径, 可以统一管理
import request from '@/utils/request'
import { getToken } from '@/utils/token'
// 登录- 登录接口
// axios内部, 会把参数对象转成json字符串格式后发给后台
// axios内部, 会自动携带请求参数(headers)里Content-Type: 'application/json'
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 频道-获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 频道 - 获取用户选择的频道
// 注意: 用户没有登录, 默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 新闻 - 获取文章新闻推荐
// 注意: 用户没有登录, 默认返回后台设置的默认频道列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
