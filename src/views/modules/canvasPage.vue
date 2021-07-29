<template>
  <div class="canvas-page" ref="canvas-page">
    <canvas id="my-canvas" ref="my-canvas">
      你的浏览器不支持 canvas，请升级你的浏览器。
    </canvas>
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
  watch: {
    colorValue () {
      clearTimeout(this.timer)
      this.drawCanvas("my-canvas", 140, 1000)
    }
  },
  mounted () {
    this.drawCanvas("my-canvas", 140, 1000);
  }
})
export default class canvasPage extends Vue {
  ctx = ''
  timer = ''
  // canvas基础
  canvasBasic () {
    // 画布
    let canvas = this.$refs['my-canvas'] as any
    // 画笔
    let ctx = canvas.getContext("2d")
    // 填充的颜色
    ctx.fillStyle = "#dddddd"
    // 填充一个矩形
    ctx.fillRect(0, 0, 400, 400)
    // 绘制一个矩形边框
    ctx.strokeRect(0, 0, 400, 400)
    // 清除指定的矩形区域，然后这块区域会变的完全透明。
    ctx.clearRect(150, 150, 150, 150)
    
    // 绘制路径
    //新建一条path
    ctx.beginPath();
    // 起始点
    ctx.moveTo(20,20)
    // 结束点
    ctx.lineTo(120,20)
    // 线的两端
    // ctx.lineCap = 'round'
    ctx.lineTo(120,120)
    ctx.lineTo(20,120)
    //闭合路径
    ctx.closePath();
    // 线宽度
    ctx.lineWidth = 10
    // 线颜色
    ctx.strokeStyle = '#FF0000'
    // 线的交汇处
    ctx.lineJoin = 'round'
    ctx.fillStyle = "#000000"
    // 填充路径
    ctx.fill()
    // 绘制
    ctx.stroke();

    // 绘制圆弧1
    ctx.beginPath();
    //    圆心(1、2)  半径  开始弧度  结束弧度    是否顺时针
    //         ⬇      ⬇      ⬇        ⬇          ⬇
    ctx.arc(50, 50,   20,    0,    Math.PI,    true);
    ctx.arc(50, 65,   20,    0,    Math.PI,    false);
    ctx.lineWidth = 1
    ctx.strokeStyle = '#009BFF'
    ctx.stroke();

    
    // 绘制圆弧2
    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.moveTo(50, 50)
    // 参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
    ctx.arcTo(200, 50, 200, 200, 100)
    ctx.lineTo(200, 200)
    ctx.stroke()
  }

  // 实现水波纹
  drawCanvas($canvasID, $progress, $time) {
    let _this: any = this
    let waveWidth = 3300, //波浪长度
        offset = 0,
        waveHeight = 30, //波浪起伏高度
        waveCount = 6, //波浪个数
        startX = -1000,
        startY = 212, //canvas 高度
        progress = $progress, //波浪位置高度
        d2 = waveWidth / waveCount, //单个波浪的宽度
        d = d2 / 2,
        hd = d / 2,
        canvas = document.getElementById($canvasID) as any,
        ctx = canvas.getContext("2d"),
        element = this.$refs['canvas-page'] as any
    canvas.width = element.offsetWidth; //画布宽度
    canvas.height = element.offsetHeight; //画布高度
    _this.ctx = canvas.getContext("2d")
    function move() {
      offset -= 5;
      if (-1 * offset === d2) {
        offset = 0;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = _this.colorValue; //画布填充色
      ctx.beginPath();
      let offsetY = startY - progress;
      //绘制贝塞尔曲线
      ctx.moveTo(startX - offset, offsetY); //开始点
      for (let i = 0; i < waveCount; i++) {
        let dx = i * d2;
        let offsetX = dx + startX - offset;
        //   quadraticCurveTo(1,1,2,2) 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。(1,1控制点，2,2结束点)
        ctx.quadraticCurveTo(
          offsetX + hd,
          offsetY + waveHeight,
          offsetX + d,
          offsetY
        );
        ctx.quadraticCurveTo(
          offsetX + hd + d,
          offsetY - waveHeight,
          offsetX + d2,
          offsetY
        );
      }
      ctx.lineTo(startX + waveWidth, 3000);
      ctx.lineTo(startX, 3000);
      ctx.fill();
      _this.timer = setTimeout(move, $time / 60); //速度
    }

    move();
  }
}
</script>
<style lang="scss">
  .canvas-page {
    height: 100%;
  }
</style>