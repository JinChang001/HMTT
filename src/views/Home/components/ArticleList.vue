<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="50"
        @load="onLoad"
      >
        <!-- 文字列表 -->
        <ArticleItem v-for="item in list" :key="item.art_id" :artObj="item" @disLikeEV="disLikeFn" @reportEV="reportFn"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAllArticleListAPI, dislikeArticleAPI, articleReportsAPI } from '@/api'
import ArticleItem from './ArticItem.vue'
import { Notify } from 'vant'

// 问题1: 网页刚打开, created里的请求和onLoad里请求同时发送, 请求的都是最新数据, onLoad中, 2次一样的数据合并, 数据重复, key重复报错
// 原因: van-list组件, 组件挂载时, 默认就会判定一次是否触底
// 第一页数据也是网络请求回来的, 标签先挂载了, 数据回来更新DOM, 所以标签没有高度, list的load事件上来就触发
// 解决方案1: list组件添加: :immediate-check="false" 上来初始化时不请求
// 解决方案2: 在onLoad第一行, 写数组长度的判断, 数组为空不执行

export default {
  components: { ArticleItem },
  name: 'HmttArticlelist',
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道ID
  },
  data () {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加载状态
      finished: false, // 底部完成状态
      theTime: new Date().getTime(), // 用于分页
      refreshing: false // 顶部加载状态
    }
  },
  async created () {
    this.getArticleListFn()
  },
  methods: {
    // 专门发送请求
    async getArticleListFn () {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      this.loading = false
      this.refreshing = false
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 底部加载
    async onLoad () {
      if (this.list.length === 0) return // 防止初始化俩次请求
      this.getArticleListFn()
    },
    // 下拉刷新
    async onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.theTime = new Date().getTime()
      this.list = []

      this.getArticleListFn()
    },
    // 反馈的不感兴趣
    async disLikeFn (artId) {
      await dislikeArticleAPI(artId)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 举报文章
    async reportFn (data) {
      await articleReportsAPI(data)
      Notify({ type: 'success', message: '举报成功' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
