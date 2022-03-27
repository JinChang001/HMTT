<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/logo.png" alt="" class="logo">
        </template>
        <template #right>
          <!-- 注意:postcss只能翻译style里的css样式代码,标签内行内样式无法转换px->rem, 需要手动计算 -->
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏 -->
    <div class="main">
      <van-tabs v-model="channlesId" animated sticky offset-top="1.226667rem" @change="channelChangeFn">
        <van-tab v-for="item in userChannelList" :key="item.id" :title="item.name" :name="item.id">
          <ArticleList :channelId="channlesId"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'

// 目标1: 获取不同的文章列表, 需要传递不同的频道ID
// 想法: 让van-tabs的v-model关联频道ID

// 目标2: 点击tab标签页@change触发, 重新发送请求, 拿到新的数据
// 问题: 每次切换tab拿到的数据都是新的
// 即使使用keep-alive也没用(防止组件呗销毁, 而组件并没有被销毁, 知识点击切换数据)
// 解决: 之前使用的是同一个数组切换数据(多个ArticleList使用同一个数组, 更新会互相影响) 修改为分别请求,在子组件created时就创建完成,不再切换请求
export default {
  name: 'HmttIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      channlesId: 0, // tab导航-激活索引(默认频道id为0,即为推荐频道)
      userChannelList: null // 用户选择频道列表
      // articleList: [] // 文章列表
    }
  },
  async created () {
    // 获取频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    // this.channelChangeFn()
  },
  methods: {
    // tabs切换的时间 =》 获取文章列表数据
    async channelChangeFn () {
      // // 获取文章列表
      // const res2 = await getAllArticleList({
      //   channel_id: this.channlesId,
      //   timestamp: (new Date().getTime())
      // })
      // this.articleList = res2.data.data.results
      // console.log(res2)
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 2.666667rem;
  height: 0.8rem;
}
.main {
  padding-top: 1.226667rem;
}
</style>
