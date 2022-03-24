<template>
  <div>
    <div class="home_container">
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar route v-model="active">
        <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HmttIndex',

  data () {
    return {
      active: 0
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
  // 内容底部内边距(吧内容往上挤, 防止内部被底部导航挡住)
  .home_container {
    padding-bottom: 50px;
  }
  // 底部导航上边框
  .van-tabbar {
    border-top: 1px solid #f8f8f8;
  }
</style>
