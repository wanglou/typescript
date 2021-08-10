<template>
  <div class="async">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
})
export default class async extends Vue {
  created () {
    this.test4()
  }
  fn () {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(111)
        res(1)
      }, 1000);
    })
  }
  async test () {
    await this.fn()
    console.log(222)
  }

  fn2 (猜测):Promise<number> {
     return new Promise((res, rej) => {
      let sino = parseInt(String(Math.random() * 6 + 1))
      // console.log(sino)
      // if (sino > 3) {
      //   if (猜测 === '大') {
      //     res(sino)
      //   } else {
      //     rej(sino)
      //   }
      // } else {
      //   if (猜测 === '大') {
      //     rej(sino)
      //   } else {
      //     res(sino)
      //   }
      // }
      setTimeout(()=>{
        res(sino)
      },300)
    })
  }

  async test2 () {
    try {
      //把await及获取它的值的操作放在try里
      let n = await this.fn2('大')
      console.log('赢了' + n)
    } catch(error) {
      //失败的操作放在catch里
      console.log('输了' + error)
    }
  }

  async test3 () {
    // promise.all里面跟一个数组，数组的每一项是一个返回promise的函数调用，
    // then的第一个参数是所有的promise都成功后调用，拿到所有promise的结果是一个数组；
    // 第二个参数拿到的是第一个失败的值
    Promise.all([this.fn2('大'),this.fn2('大')]).then(
      (res) => {console.log(res)},
      (res) => {console.log(res)}
    )
  }

  async test4 () {
    let n = await Promise.all([this.fn2('大'),this.fn2('大')])
    console.log(n)
  }
}
</script>
<style lang="scss">
</style>