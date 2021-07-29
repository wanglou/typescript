<template>
  <div class="closure">
    <el-button type="primary" size="mini" @click="btnClick"> {{ closure()() }}触发闭包 </el-button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style

// 闭包：即重用一个变量，又保护变量不被污染的一种机制。
// 为什么使用闭包 : 全局变量和局部变量都具有不可兼得的优缺点。
//  　　全局变量:  优: 可重用, 缺: 易被污染。
//  　　局部变量:  优: 仅函数内可用，不会被污染。
//  　　　　　　   缺: 不可重用!
@Component({
  created () {
  }
})
export default class closure extends Vue {
  btnClick: Function = () => {
    let fn = this.closure()
    fn()
  }
  closure: Function = (): Function => {
    let count = 0
    return () => {
      console.log(count)
    }
  }
}
</script>
<style lang="scss">
  .closure {
  }
</style>