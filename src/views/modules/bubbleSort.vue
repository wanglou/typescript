<template>
  <div class="bubble-sort">
    <!-- 字节跳动图标库 -->
    <home theme="filled"/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style

//interface 验证的对象必须符合objValidate的条件
// 接口
interface objValidate{
  name: String;
  count: String | Number;
  age?: Number;//age 被定义为可选属性，那么在传对象的时候age就可有可无。
  readonly sex: Boolean;//只读属性，一旦被赋值，不能修改
}

@Component({
})
export default class bubbleSort extends Vue {
  
  private created () {
    // this.sortFn()
    let obj = {
      name:'孙章',
      count:1
    }
    let obj2 = {
      name:'孙章',
      count:1,
      age:3,
      sex:true
    }
    // 错误类型 count 报错
    // let obj3 = {
    //   name: '孙章',
    //   count: {},
    //   age:3,
    //   sex:true
    // }
    this.changeObj(obj2);
  }
  //changeObj方法传入的参数必须符合objValidate的条件
  private changeObj(obj:objValidate){
    console.log(obj.name);
    console.log(obj.count);
    // obj.sex = 1
  }

  private sortFn ():void {
    // let initList = [{num: 9}, {num: 8}, {num: 5}, {num: 7}, {num: 6}, {num: 1}, {num: 2}, {num: 0}, {num: 3}, {num: 4}]
    // console.log(initList.sort((a, b) => {
    //   return a.num-b.num
    // }))

    let arr = [ 656565, 1, 2, 6, 5, 3, 8, 4, 9 ]
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
    console.log('冒泡排序' + arr)


    
    console.log('快速排序' + 1)
  }
}
</script>
<style lang="scss">
  .bubble-sort {
  }
</style>