<template>
  <div class="aside-menu">
    <ul>
      <li :style="{background: colorValue, opacity: .6}"
          :class="{active: activeNum === index}"
          v-for="(item, index) in menuList" :key="index"
          @click="asideClick(item, index)"> {{ item.name }} </li>
    </ul>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
// Define the component in class-style
@Component({
  computed: {
    // 辅助函数
    ...mapState({
      colorValue: state => {
        return (state as any).user.colorValue
      }
    })
  },
  created () {
    this.activeNum = this.$route.meta.index
  }
})
export default class AsideMenu extends Vue {
  activeNum: number = 0
  menuList: Array<object> = [
    { name: '首页', path: '/homePage' },
    { name: 'canvas水波纹', path: '/canvasPage' },
    { name: '水印', path: '/watermark' },
    { name: '防抖节流', path: '/debounceThrottle' },
    { name: '闭包', path: '/closure' },
    { name: '图片裁剪', path: '/imageCropping' },
    { name: '日历', path: '/calendar' },
    { name: 'flex弹性盒子', path: '/flex' },
    { name: '导出PDF', path: '/exportPDF' }
  ]
  asideClick (item, index):void {
    this.activeNum = index
    this.$router.push(item.path)
  }
}
</script>
<style lang="scss">
  .aside-menu {
    padding: 10px;
      height: calc(100% - 43px);
    ul {
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      height: 100%;
      overflow-y: auto;
      li {
        line-height: 50px;
        cursor: pointer;
        color: #fff;
        padding-left: 20px;
        margin-bottom: 5px;
        &.active {
          opacity: 1 !important;
        }
      }
    }
  }
</style>