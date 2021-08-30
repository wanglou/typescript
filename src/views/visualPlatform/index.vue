<template>
  <div class="visual-platform-index">
    <!-- 可拖拽组件 -->
    <div class="left">
      <ul>
        <li v-for="(item, index) in leftComponentList" :key="index" @mousedown="leftMousedown"></li>
      </ul>
    </div>

    <!-- 组件展示部分 -->
    <div class="middle" ref="middle">
      <div @mousedown="middleItemMousedown($event, item)" v-for="(item, index) in middleList" :key="index" :style="{left: item.left + 'px', top: item.top + 'px'}">
        <div v-html="item.content"></div>
      </div>
    </div>

    <!-- 组件配置 -->
    <div class="right"></div>

    <!-- 拖拽中的div -->
    <div ref="moving-div" :style="movingDivStyle" class="moving-div"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
})
export default class visualPlatformIndex extends Vue {
  leftComponentList: Array<object> = [
    { name: '' }
  ]
  middleList: Array<object> = []
  movingDivStyle: object = {
    left: 0,
    top: 0,
    display: 'none'
  }

  leftMousedown (event: any):void {
    const maskEvent = event || window.event,
    self = this
    const offsetX = maskEvent.offsetX,
    offsetY = maskEvent.offsetY

    let timer = null
    self.movingDivStyle = {
      left: maskEvent.clientX + 'px',
      top: maskEvent.clientY + 'px',
      display: '',
      transform: `translate(-${offsetX}px, -${offsetY}px)`
    }
    document.onmousemove = function (ev) {
      const event = (ev || window.event) as any
      self.movingDivStyle = {
        left: event.clientX + 'px',
        top: event.clientY + 'px',
        display: 'block',
        transform: `translate(-${offsetX}px, -${offsetY}px)`
      }
      clearTimeout(timer)
    }

    const middleEle = self.$refs['middle'] as any
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null

      setTimeout(() => {
        middleEle.onmouseenter = null
      }, 30);
      
      const movingDivStyle = self.movingDivStyle as any
      movingDivStyle.display = 'none'
    }

    middleEle.onmouseenter = function (ev: any) {
      const event = ev || window.event
      timer = setTimeout(() => {
        self.middleList.push({
          content: '<div style="width: 100px; height: 100px; background: red;"></div>',
          left: event.offsetX - offsetX,
          top: event.offsetY - offsetY
        })
      }, 20);
    }

  }

  middleItemMousedown (event: any, item: any):void {
    const eleEvent = event || window.event,
    self = this
    
    const offsetX = eleEvent.offsetX,
          offsetY = eleEvent.offsetY,
          itemWidth = eleEvent.target.offsetWidth,
          itemHeight = eleEvent.target.offsetHeight
    const middleEle = self.$refs['middle'] as any
    const offsetLeft = middleEle.offsetLeft,
          offsetTop = middleEle.offsetTop,
          width = middleEle.offsetWidth,
          height = middleEle.offsetHeight
    document.onmousemove = function (ev) {
      const itemEvent = ev || window.event as any
      let left = itemEvent.clientX - offsetLeft - offsetX,
      top = itemEvent.clientY - offsetTop - offsetY
      if (left <= 0) left = 0
      if (left >= width - itemWidth) left = width - itemWidth
      if (top <= 0) top = 0
      if (top >= height - itemHeight) top = height - itemHeight

      item.left = left
      item.top = top
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
</script>
<style lang="scss">
  @import '@/assets/scss/index.scss';
  .visual-platform-index {
    height: calc(100vh - 60px);
    background: $themeColor;
    padding: 5px 0;
    box-sizing: border-box;
    display: flex;
    &>div {
      background: #fff;
      height: 100%;
    }
    .left, .right {
      width: 240px;
      margin: 0 5px;
    }
    .middle {
      flex: 1;
      position: relative;
      overflow: hidden;
      &>div {
        cursor: move;
        position: absolute;
      }
    }
    
    // 可拖拽组件
    .left {
      ul {
        li {
          display: inline-block;
          width: 100px;
          height: 100px;
          border-radius: 5px;
          background: #33383E;
          margin: 10px 10px 0;
          cursor: move;
        }
      }
    }

    // 移动中的div
    .moving-div {
      position: fixed;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      background: #33383E;
      cursor: move;
    }
  }
</style>
