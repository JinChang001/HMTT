<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图 -->
          <img v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images" alt="">
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img class="thumb" v-for="(imgUrl, index) in artObj.cover.images" :key="index" :src="imgUrl" alt="">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="onClick" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈面板 -->
    <van-action-sheet
      v-model="isShowAction"
      get-container="body"
      :actions="actions"
      :cancel-text="bottomText"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { timeAgo } from '@/utils/data'
import { firstActions, secondActions } from '@/api/report'

export default {
  props: {
    artObj: Object // 文章对象
  },
  data () {
    return {
      isShowAction: false, // 展示反馈面板状态
      actions: firstActions, // 反馈面板数组
      bottomText: '取消' // 底部按钮的文字
    }
  },
  methods: {
    formatTime: timeAgo,
    // 点击反馈按钮
    onClick () {
      this.bottomText = '取消'
      this.actions = firstActions
      this.isShowAction = true
    },
    // 反馈面板选择
    async onSelect (action, index) {
      if (action.name === '反馈垃圾内容') {
        this.bottomText = '返回'
        this.actions = secondActions
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.isShowAction = false
      } else { // 二级反馈面板
        this.$emit('reportEV', {
          target: this.artObj.art_id,
          type: action.value,
          remark: null
        })
        this.isShowAction = false
      }
    },
    // 底部按钮的点击事件
    onCancel () {
      if (this.bottomText === '返回') {
        this.bottomText = '取消'
        this.isShowAction = true
        this.actions = firstActions
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}

// 单图样式: 矩形黄金比例: 0.618
.thumb {
  width: 113px;
  height: 70px;
  background: #f8f8f8;
  object-fit: cover;
}

// 三图, 图片容器
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
