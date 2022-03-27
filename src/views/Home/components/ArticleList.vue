<template>
  <div>
    <!-- 文字列表 -->
    <ArticleItem v-for="item in list" :key="item.art_id" :artObj="item"></ArticleItem>
  </div>
</template>

<script>
import { getAllArticleListAPI } from '@/api'
import ArticleItem from './ArticItem.vue'
export default {
  components: { ArticleItem },
  name: 'HmttArticlelist',
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道ID
  },
  data () {
    return {
      list: [] // 文章列表数组
    }
  },
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: new Date().getTime()
    })
    this.list = res.data.data.results
  }
}
</script>

<style lang="scss" scoped>

</style>
