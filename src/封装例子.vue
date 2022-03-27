<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  name: 'HmttApp',

  data () {
    return {
    }
  },
  async created () {
    try {
      const res = await getAllChannelsAPI()
      console.log('所有频道数据' + res)
    } catch (err) {
      // 给用户弹窗提示
      console.dir(err)
    }
  },
  mounted () {
  },

  methods: {
  }
}
</script>
<style lang="less" scoped>

</style>
