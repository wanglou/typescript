<template>
  <div class="water-mark" :style="{background: 'url(' + backgroundImage + ')'}">
    <canvas id="my-canvas" style="display: none;" ref="my-canvas">
      你的浏览器不支持 canvas，请升级你的浏览器。
    </canvas>
    <el-input style="width: 300px;" clearable v-model="fontValue" placeholder="水印文字" size="small">
      <el-button @click="confirm" slot="append"> 确定 </el-button>
    </el-input>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
  mounted () {
    this.drawBackground(this.fontValue)
  }
})
export default class watermark extends Vue {
  fontValue: string = 'Hello World'
  backgroundImage: string = ''
  // 生成背景图
  drawBackground (text: string):void {
    // 画布
    let canvas = this.$refs['my-canvas'] as any
    canvas.width = 400; canvas.height = 200
    // 画笔
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0,0,canvas.width,canvas.height);  
    ctx.font="30px Arial";
    ctx.fillStyle = "#E8E8E8";
    // 将画布的原点移动
    ctx.translate(100, 60);
    // 弧度 = (Math.PI/180)*角度
    ctx.rotate((Math.PI / 180) * -8);
    ctx.fillText(text,10,50);
    this.backgroundImage = canvas.toDataURL("image/png");
  }
  confirm ():void {
    this.drawBackground(this.fontValue)
  }
}
</script>
<style lang="scss">
  .water-mark {
    height: 100%;
  }
</style>