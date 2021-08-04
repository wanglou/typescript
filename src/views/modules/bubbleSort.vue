<template>
  <div class="bubble-sort">
    
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
  created () {
    this.sortFn()
  }
})
export default class bubbleSort extends Vue {
  sortFn ():void {
    let initList = [{num: 9}, {num: 8}, {num: 5}, {num: 7}, {num: 6}, {num: 1}, {num: 2}, {num: 0}, {num: 3}, {num: 4}]
    console.log(initList.sort((a, b) => {
      return a.num-b.num
    }))

    let arr = [ 1, 2, 6, 5, 3, 8, 4, 9 ]
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
    console.log(arr)
  }
}
</script>
<style lang="scss">
  .bubble-sort {
  }
</style>