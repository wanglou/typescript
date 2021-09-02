<template>
  <div class="visual-platform-index">
    <!-- 可拖拽组件 -->
    <div class="left">
      <ul>
        <li v-for="(item, index) in leftComponentList" :key="index" @mousedown="leftMousedown($event, item)">
          <img draggable="false" :src="item.img" alt="">
        </li>
      </ul>
    </div>

    <!-- 组件展示部分 -->
    <div class="middle-container" ref="middle-container">

      <!-- 尺子 -->
      <div class="ruler">
        <canvas class="vw-ruler" ref="vwRuler" width="2048" height="20"></canvas>
        <canvas class="vh-ruler" ref="vhRuler" width="20" height="2048"></canvas>
      </div>

      <!-- 参考线 -->
      <div class="reference-line">
        <div class="vw-line vw-line-1" ref="vw-line-1"></div>
        <div class="vw-line vw-line-2" ref="vw-line-2"></div>
        <div class="vh-line vh-line-1" ref="vh-line-1"></div>
        <div class="vh-line vh-line-2" ref="vh-line-2"></div>
      </div>

      <div class="middle" ref="middle">
        <div class="middle-item" @mousedown="middleItemMousedown($event, item)" v-for="(item, index) in middleList" :key="index" :style="{left: item.left + 'px', top: item.top + 'px'}">
          <div v-html="item.content"></div>
          <el-button @click="codeEdit(item, index)" type="text" class="icon-s-opportunity" icon="el-icon-s-opportunity">  </el-button>
          <el-button @click="middleItemDel(item, index)" type="text" class="icon-delete" icon="el-icon-delete">  </el-button>
          <!-- <i class="corner left-top"></i>
          <i class="corner right-top"></i>
          <i class="corner left-bottom"></i> -->
          <i class="corner right-bottom"></i>
        </div>
      </div>
    </div>

    <!-- 组件配置 -->
    <div class="right">
      <el-button type="primary" size="mini" @click="saveBtn"> 保存 </el-button>
      <el-button type="primary" size="mini" @click="previewBtn"> 预览 </el-button>
    </div>

    <!-- 拖拽中的div -->
    <div ref="moving-div" :style="movingDivStyle" class="moving-div"></div>

    <!-- 代码弹框 -->
    <el-dialog
      v-dialogDrag
      title="Echarts配置项"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="800px">

      <div>
        <codemirror ref="codemirror" v-model="codeContent" :options="cmOption" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="codeEditConfirm" size="mini">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as echarts from 'echarts';

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// 语言
import 'codemirror/mode/javascript/javascript.js'
// 主题
import 'codemirror/theme/base16-dark.css'
// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'


// Define the component in class-style
@Component({
  components: {
    codemirror
  },
  created () {
    sessionStorage.PREVIEW_DATA = ''
  },
  mounted () {
    // 画尺子
    this.drawRulers()
  }
})
export default class visualPlatformIndex extends Vue {
  codeContent = '{}'
  cmOption = {
    tabSize: 4,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true,
    foldGutter: true,
    lineWrapping: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  }
  dialogVisible:boolean = false 
  leftComponentList: Array<object> = [
    { name: '柱状图', img: require('@/assets/images/bar.png') },
    { name: '折线图', img: require('@/assets/images/line.png') },
    { name: '饼图', img: require('@/assets/images/pie.png') }
  ]
  middleList: Array<object> = []
  middleListIndex = 0
  movingDivStyle: object = {
    left: 0,
    top: 0,
    display: 'none'
  }

  chartList = {
    '柱状图': {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }]
    },
    '折线图': {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    },
    '饼图': {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            {value: 1048, name: '搜索引擎'},
            {value: 735, name: '直接访问'},
            {value: 580, name: '邮件营销'},
            {value: 484, name: '联盟广告'},
            {value: 300, name: '视频广告'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  leftMousedown (event: any, item: any):void {
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
      event.preventDefault();


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
      const event = ev || window.event,
      num = self.middleList.length === 0 ? 0 : (self.middleList[self.middleList.length - 1] as any).num + 1
      timer = setTimeout(() => {
        self.middleList.push({
          content: `<div id="myChart${ num }" style="width: 300px; height: 300px;"></div>`,
          num: num,
          left: event.offsetX - offsetX,
          top: event.offsetY - offsetY,
          name: item.name,
          option: self.chartList[item.name]
        })
        
        self.$nextTick(() => {
          const myCharts = echarts.init(document.getElementById(`myChart${(self.middleList[self.middleList.length - 1] as any).num}`))
          myCharts.setOption(self.chartList[item.name])
        })
        
      }, 20);
    }

  }

  middleItemMousedown (event: any, item: any):void {
    const eleEvent = event || window.event,
    self = this
    const offsetX = eleEvent.offsetX,
          offsetY = eleEvent.offsetY,
          mouseX = eleEvent.clientX,
          mouseY = eleEvent.clientY,
          afterWidth = parseInt(document.getElementById(`myChart${item.num}`).style.width),
          afterHeight = parseInt(document.getElementById(`myChart${item.num}`).style.height)

    const middleEle = self.$refs['middle'] as any,
          middleContainerEle = self.$refs['middle-container'] as any

    const offsetLeft = middleContainerEle.offsetLeft + 20,
          offsetTop = middleContainerEle.offsetTop + 20,
          width = middleEle.offsetWidth,
          height = middleEle.offsetHeight,
          vwLine1 = self.$refs['vw-line-1'] as any,
          vwLine2 = self.$refs['vw-line-2'] as any,
          vhLine1 = self.$refs['vh-line-1'] as any,
          vhLine2 = self.$refs['vh-line-2'] as any
    document.onmousemove = function (ev) {
      const itemEvent = ev || window.event as any,
            mouseMoveX = itemEvent.clientX - mouseX,
            mouseMoveY = itemEvent.clientY - mouseY
      if (event.target.className.indexOf('corner') !== -1) {
        const myChartEle = document.getElementById(`myChart${item.num}`)
        myChartEle.style.width = (afterWidth + mouseMoveX) + 'px'
        myChartEle.style.height = (afterHeight + mouseMoveY) + 'px'
        const myCharts = echarts.init(document.getElementById(`myChart${item.num}`))
        myCharts.resize()
      } else {
        let left = itemEvent.clientX - offsetLeft - offsetX,
        top = itemEvent.clientY - offsetTop - offsetY,
        itemWidth = eleEvent.target.offsetWidth,
        itemHeight = eleEvent.target.offsetHeight
        if (left <= 0) left = 0
        if (left >= width - itemWidth) left = width - itemWidth
        if (top <= 0) top = 0
        if (top >= height - itemHeight) top = height - itemHeight
  
        vwLine1.style.top = top + 20 + 'px'
        vwLine2.style.top = top + 20 + itemHeight + 'px'
        vhLine1.style.left = left + 20 + 'px'
        vhLine2.style.left = left + 20 + itemWidth + 'px'
  
        item.left = left
        item.top = top
      }
    }

    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
      vwLine1.style.top = 0
      vwLine2.style.top = 0
      vhLine1.style.left = 0
      vhLine2.style.left = 0
    }

  }

  // 删除中间拖拽的组件
  middleItemDel (item: any, index: number):void {
    this.middleList.splice(index, 1)
    this.$nextTick(() => {
      this.middleList.forEach((child: any) => {
        const myCharts = echarts.init(document.getElementById(`myChart${child.num}`))
        myCharts.setOption(child.option)
      })
    })
  }

  // 编辑echarts配置项
  codeEdit (item: any, index: number) {
    this.dialogVisible = true
    this.middleListIndex = index
    let option = JSON.stringify(item.option, null, 2)
    this.codeContent = option
  }

  // 编辑配置项确定
  codeEditConfirm () {
    const code = this.$refs.codemirror as any,
          child = this.middleList[this.middleListIndex] as any
    child.option = JSON.parse(code.codemirror.getValue())
    const myCharts = echarts.init(document.getElementById(`myChart${child.num}`))
    myCharts.setOption(child.option, true)
    this.dialogVisible = false
  }

  // 画尺子
  drawRulers ():void {
    // 横向尺子
    let canvas = this.$refs['vwRuler'] as any
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "#24292E"
    ctx.fillRect(0, 0, 2048, 20)

    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1
    ctx.strokeStyle = '#ffffff'
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    for (let i = 20; i < 2048; i+=10) {
      if ((i - 20) % 50 === 0) {
        ctx.moveTo(i, 10)
        ctx.lineTo(i, 20)
        ctx.fillText(i - 20, i, 8)
      } else {
        ctx.moveTo(i, 15)
        ctx.lineTo(i, 20)
      }
    }
    ctx.stroke();


    let canvas2 = this.$refs['vhRuler'] as any
    let ctx2 = canvas2.getContext("2d")
    ctx2.fillStyle = "#24292E"
    ctx2.fillRect(0, 0, 20, 2048)
    
    ctx2.translate(0.5, 0.5)
    ctx2.lineWidth = 1
    ctx2.strokeStyle = '#ffffff'
    ctx2.fillStyle = '#ffffff'
    ctx2.beginPath()
    for (let i = 0; i < 2048; i+=10) {
      if (i % 50 === 0) {
        ctx2.moveTo(10, i)
        ctx2.lineTo(20, i)
        ctx2.fillText(i, 0, i + 10)
      } else {
        ctx2.moveTo(15, i)
        ctx2.lineTo(20, i)
      }
    }
    ctx2.stroke();
  }

  // 保存按钮
  saveBtn ():void {
    const middleEle = this.$refs['middle'] as any
    const middleEleWidth = middleEle.offsetWidth,
          middleEleHeight = middleEle.offsetHeight
    let previewList = []
    this.middleList.forEach((child: any) => {
      const itemEle = document.getElementById(`myChart${child.num}`)
      previewList.push({
        option: child.option,
        num: child.num,
        left: child.left / middleEleWidth,
        top: child.top / middleEleHeight,
        width: itemEle.offsetWidth / middleEleWidth,
        height: itemEle.offsetHeight / middleEleHeight
      })
    })
    sessionStorage.PREVIEW_DATA = JSON.stringify(previewList)
  }

  // 预览按钮
  previewBtn ():void {
    window.open('/preview')
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
      height: 100%;
    }
    .left, .right {
      width: 240px;
      margin: 0 5px;
      background: #fff;
    }
    .middle-container {
      background: #fff;
      flex: 1;
      position: relative;
      overflow: hidden;
      .middle {
        position: absolute;
        left: 20px;
        top: 20px;
        right: 0;
        bottom: 0;
      }
      .middle-item {
        cursor: move;
        position: absolute;
        border: 1px dashed transparent;
        &:hover {
          border-color: #409EFF;
          .el-button {
            display: block;
          }
          &>i {
            display: block;
          }
        }
        .el-button {
          display: none;
          position: absolute;
          top: 5px;
          right: 5px;
          padding: 0;
          color: #F56C6C;
        }
        .icon-s-opportunity {
          right: 25px;
        }
        &>i {
          display: none;
          width: 8px;
          height: 8px;
          background: #1E9FFF;
          position: absolute;
          &.left-top {
            left: 0;
            top: 0;
            transform: translate(-50%, -50%);
            cursor: se-resize;
          }
          &.right-top {
            right: 0;
            top: 0;
            transform: translate(50%, -50%);
            cursor: ne-resize;
          }
          
          &.right-bottom {
            right: 0;
            bottom: 0;
            transform: translate(50%, 50%);
            cursor: se-resize;
          }
          &.left-bottom {
            left: 0;
            bottom: 0;
            transform: translate(-50%, 50%);
            cursor: ne-resize	;
          }
        }
      }

      // 参考尺
      .vw-ruler {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
      }
      .vh-ruler {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 20px;
      }

      // 参考线
      .reference-line {
        .vw-line {
          position: absolute;
          top: 0px;
          width: 100%;
          height: 0px;
          border-bottom: 1px dashed #FF5C18;
        }
        .vh-line {
          position: absolute;
          left: 0px;
          width: 0px;
          height: 100%;
          border-right: 1px dashed #FF5C18;
        }
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
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    // 配置项
    .right {
      padding: 10px;
      box-sizing: border-box;
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

    @keyframes dialog-fade-in {
      0% {
        transform: translate3d(0, -249px, 0);
        opacity: 0;
      }
      100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  
    @keyframes dialog-fade-out {
      0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      100% {
        transform: translate3d(0, -249px, 0);
        opacity: 0;
      }
    }

    .el-dialog {
      .el-dialog__header {
        background: $themeColor;
        opacity: 0.8;
        .el-dialog__title {
          color: #fff;
        }
      }
      .el-dialog__body {
        padding: 5px 1px;
      }
      .el-dialog__footer {
        padding: 5px 10px 10px;
      }
    }
  }
</style>
