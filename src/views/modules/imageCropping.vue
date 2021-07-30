<template>
  <div class="image-cropping">
    <el-upload
      style="display: inline-block;"
      :auto-upload="false"
      :on-change="uploadChange"
      :show-file-list="false"
      action="#">
      <el-button type="primary" size="mini"> 上传图片 </el-button>
    </el-upload>
    <el-button v-if="maskShow" style="margin-left: 10px;" type="primary" size="mini"  @click="tailoringBtn"> 裁剪 </el-button>
    <div class="container" >
      <!-- 裁剪区 -->
      <div class="tailoring">

        <!-- 背景图片 -->
        <img ref="backImg" :style="imgStyle" v-if="imgSrc" :src="imgSrc" alt="">
        <!-- 遮罩层 -->
        <div class="mask-layer"></div>

        <!-- 拖拽区域 -->
        <div v-if="maskShow" ref="hiddenImg" class="drag" :style="maskStyle" @click="maskClick" @mousedown="maskMove">
          <div class="hidden-img-container">
            <img :style="hiddenImgStyle" v-if="imgSrc" :src="imgSrc" alt="">
          </div>

          <!-- 右下角拖拽点 -->
          <span class="point" ref="point" @mousedown="pointMouseDown"></span>
        </div>
      </div>
      <!-- 效果展示区 -->
      <div class="imageShow">
        <div> <img v-if="showImgSrc" :src="showImgSrc" alt=""> </div>
        <div> <img v-if="showImgSrc" :src="showImgSrc" alt=""> </div>
        <div> <img v-if="showImgSrc" :src="showImgSrc" alt=""> </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
  created () {
  }
})
export default class imageCropping extends Vue {
  imgSrc: string = ''
  showImgSrc: string = ''
  imgStyle: object = {}
  hiddenImgStyle: object = {}
  maskStyle: object = {}
  maskShow: boolean = false
  startX: number = 0
  startY: number = 0
  imgWidth: number = 0
  imgHeight: number = 0
  canDrag: boolean = true
  // 上传图片
  uploadChange (file: object): void {
    let raw = (file as any).raw
    this.maskShow = true
    this.showImgSrc = ''
    this.getImgWH(raw)
  }

  // 裁剪按钮
  tailoringBtn ():void {
    let imgObject = this.$refs.backImg as any
    this.onPreloadComplete(imgObject)
  }

  // 获取图片宽高
  getImgWH (file: Blob):void {
    let reader = new FileReader()
    let _this = this
    this.$nextTick(() => {
      reader.onload = (event) => {
        let txt = event.target.result,
        img = document.createElement("img") as any;
        img.src = txt
        img.onload = function () {

          _this.imgWidth = img.width, _this.imgHeight = img.height
          // 判断图片是否需要缩小
          let bigOrSmall = _this.imgWidth > 400 || _this.imgHeight > 400
          if (_this.imgWidth > _this.imgHeight) {
            _this.imgStyle = { width: bigOrSmall ? '100%' : _this.imgWidth + 'px' }
          } else {
            _this.imgStyle = { height: bigOrSmall ? '100%' : _this.imgHeight + 'px' }
          }
          _this.imgSrc = URL.createObjectURL(file)
          
          setTimeout(() => {
            _this.maskClick()
          }, 100);
        }
      };
      reader.readAsDataURL(file)
    })
  }

  // 点击遮罩区域
  maskClick ():void {
    this.$nextTick(() => {
      let backImg = this.$refs.backImg as any,
      width = backImg.offsetWidth, height = backImg.offsetHeight,
      backImgTop = backImg.offsetTop - height / 2,
      backImgLeft = backImg.offsetLeft - width / 2,
      hiddenImgTop = (this.$refs.hiddenImg as any).offsetTop,
      hiddenImgLeft = (this.$refs.hiddenImg as any).offsetLeft,
      left = backImgLeft - hiddenImgLeft, top = backImgTop - hiddenImgTop
      this.startX = left
      this.startY = top
      this.hiddenImgStyle = { width: width + 'px',
                              height: height + 'px',
                              transform: `translate(${left}px, ${top}px)` }
                            
    })
  }

  // 拖动遮罩层
  maskMove (e: any):void {
    // 按下鼠标时获取
    let _this = this,
    maskEvent = e || window.event,
    element = this.$refs.hiddenImg as any,
    // 拖拽部分 与 父元素左上角的距离
    maskTop = element.offsetTop,
    maskLeft = element.offsetLeft,
    // 鼠标距离电脑屏幕左上角的距离
    clientX = maskEvent.clientX,
    clientY = maskEvent.clientY
    element.onmousemove = function (ev: any) {
      // 鼠标移动时获取
      event = ev || window.event
      let top = maskTop + ((event as any).clientY - clientY)
      let left = maskLeft + ((event as any).clientX - clientX)
      if (top < 0) top = 0
      else if ((element.offsetHeight + top) > 400) top = 400 - element.offsetHeight
      if (left < 0) left = 0
      else if ((element.offsetWidth + left) > 400) left = 400 - element.offsetWidth
      if (_this.canDrag) {
        _this.$set(_this.maskStyle, 'top', top + 'px')
        _this.$set(_this.maskStyle, 'left', left + 'px')
      }
      _this.maskClick()
    }
    element.onmouseup = function () {
      element.onmousemove = null
      element.onmouseup = null
    }
  }

  // 生成裁剪后的图片
  onPreloadComplete (imgObject) {
    let element = this.$refs.hiddenImg as any,
    maskWidth = element.offsetWidth,
    maskHeight = element.offsetHeight
    this.showImgSrc = this.getImagePortion(imgObject, maskWidth, maskHeight, -this.startX, -this.startY, this.imgWidth, this.imgHeight);
  }

  // 图像截取
  getImagePortion (imgObj, newWidth, newHeight, startX, startY, oldWidth, oldHeight):string {
    let tnCanvas = document.createElement('canvas'),
    tnCanvasContext = tnCanvas.getContext('2d');
    tnCanvas.width = newWidth; tnCanvas.height = newHeight;
    
    let bufferCanvas = document.createElement('canvas'),
    bufferContext = bufferCanvas.getContext('2d');
    bufferCanvas.width = imgObj.width;
    bufferCanvas.height = imgObj.height;
    bufferContext.drawImage(imgObj, 0, 0, oldWidth, oldHeight, 0, 0, imgObj.width, imgObj.height);
    
    tnCanvasContext.drawImage(bufferCanvas, startX,startY,newWidth, newHeight,0,0,newWidth,newHeight);
    return tnCanvas.toDataURL();
  }

  // 右下角拖拽点点击
  pointMouseDown (e: any):void {
    let element = this.$refs.hiddenImg as any,
    maskWidth = element.offsetWidth,
    maskHeight = element.offsetHeight
    let _this = this,
    pointEvent = e || window.event,
    clientX = pointEvent.clientX,
    clientY = pointEvent.clientY
    this.canDrag = false
    document.onmousemove = function (ev: any) {
      // 鼠标移动时获取
      event = (ev || window.event) as any
      _this.$set(_this.maskStyle, 'width', (maskWidth + ((event as any).clientX - clientX)) + 'px')
      _this.$set(_this.maskStyle, 'height', (maskHeight + ((event as any).clientY - clientY)) + 'px')
    }
    
    document.onmouseup = function (ev: any) {
      document.onmousemove = null
      document.onmouseup = null
      _this.canDrag = true
    }
  }
}
</script>
<style lang="scss">
  .image-cropping {
    // 所有元素不可选中
    * {
      user-select: none;
      -webkit-user-drag: none;
    }
    .container {
      margin-top: 20px;
      display: flex;
      flex-direction: row;

      // 裁剪区
      .tailoring {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #ddd;
        overflow: hidden;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
        &>img {
          margin: 50% 0 0 50%;
          transform: translate(-50%, -50%);
        }

        // 遮罩层
        .mask-layer {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          background: #000;
          opacity: .5;
        }
        // 拖拽区域
        .drag {
          position: absolute;
          top: 150px;
          left: 150px;
          width: 100px;
          height: 100px;
          background: transparent;
          border: 1px dashed #3495F4;
          cursor: move;
          .hidden-img-container {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            overflow: hidden;
          }
          .point {
            position: absolute;
            right: -5px;
            bottom: -5px;
            border: 5px solid transparent;
            border-left-color: #3495F4;
            transform: rotate(45deg);
            cursor: se-resize;
          }
        }
      }
      
      // 展示区
      .imageShow {
        margin-left: 20px;
        width: 300px;
        height: 400px;
        border: 1px solid #ddd;
        background: #ddd;
        border-radius: 10px;
        &>div {
          margin: 25px auto;
          background: #fff;
          border: 1px solid #ddd;
          img {
            width: 100%;
            height: 100%;
          }
          &:first-child {
            width: 100px;
            height: 100px;
          }
          &:nth-child(2) {
            width: 100px;
            height: 100px;
            border-radius: 10%;
            img {
              border-radius: 10%;
            }
          }
          &:last-child {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            img {
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
</style>