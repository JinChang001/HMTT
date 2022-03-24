<template>
  <div>
    <van-nav-bar title="黑马头条-登录"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[{ required: true, message: '请填写用户名', pattern: /^1[3-9]\d{9}$/ }]"
      />
      <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        label="密码"
        placeholder="请输入6位验证码"
        :rules="[{ required: true, message: '请填写验证码', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button type="info" round block size="large" :loading="isLoading" :disabled="isLoading" loading-text="正在登录ing..." native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'

// 写需求套路
// 1. html+css
// 2. 数据铺设, 数据绑定, 数据微调
// 3. js交互=>事件/正则

// 组件使用套路
// 找组件, 引组件, 用组件(标签和js复制), 读, 删, 改
export default {
  name: 'HmttIndex',

  data () {
    return {
      user: {
        mobile: '13888888888',
        code: '246810' // 短信验证码(规定死位246810无论手机号是什么)
      },
      isLoading: false // 登录按钮-加载状态
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 提交表单且验证通过后触发
    async onSubmit (values) {
      // 登录按钮状态修改
      this.isLoading = true

      try {
        const res = await loginAPI(values)
        this.isLoading = false
        console.log(res)
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功啦!!!' })
        // 跳转一定要写在最后
        // location.href => 当前浏览器地址和要调整的地址一样(不包括#后锚点信息) => 不会刷新网页
        // this.$router.push() 压栈(会产生历史记录,可以回退)
        // this.$router.replace() 替换(不会产生历史记录)
        this.$router.replace({ path: '/layout/home' })
      } catch (err) {
        Notify({ type: 'danger', message: '账号密码错误' })
      }

      this.isLoading = false // 网络状态请求完成, 无论成功/报错, 状态修改为false
    }
  }
}
</script>

<style lang="less" scoped>
  // .van-nav-bar {
  //   background: #007bff;
  // }
  // // 此选择器名字是van-nav-bar组件内标签
  // // scoped尝试吧此选择器后加属性选择器匹配当前页面标签(所以未选中)
  // // /deep/会把属性选择加到前面 (用后代选择器的方式往里找匹配的类名)
  // /deep/ .van-nav-bar__title {
  //   color: white;
  // }
</style>
