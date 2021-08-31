<template>
  <div class="preview" ref="preview">
    <div class="preview-item" v-for="(item, index) in previewList" :key="index" :style="{left: item.left + '%', top: item.top + '%'}">
      <div v-html="item.content"></div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import * as echarts from 'echarts';
// Define the component in class-style
@Component({
  mounted () {
    this.previewList = []
    const previewEle = this.$refs['preview'] as any
    const previewEleWidth = previewEle.offsetWidth,
          previewEleHeight = previewEle.offsetHeight
    JSON.parse(sessionStorage.PREVIEW_DATA).forEach((child: any) => {
      this.previewList.push({
        content: `<div id="myChart${ child.num }" style="width: ${previewEleWidth * child.width}px; height: ${previewEleHeight * child.height}px;"></div>`,
        num: child.num,
        left: child.left * 100,
        top: child.top * 100,
        option: child.option
      })
      this.$nextTick(() => {
        const myCharts = echarts.init(document.getElementById(`myChart${child.num}`))
        myCharts.setOption(child.option)
      })
    })
  }
})
export default class preview extends Vue {
  previewList:Array<object> = []
}
</script>
<style lang="scss">
  .preview {
    position: absolute;
    width: 100vw;
    top: 0;
    bottom: 0;
    .preview-item {
      position: absolute;
    }
  }
</style>