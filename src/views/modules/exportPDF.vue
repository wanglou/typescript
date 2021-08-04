<template>
  <div class="export-PDF" id="pdfDom">
    <v-chart :option="option" style="height: 400px;"/>
    <el-button type="primary" size="small" @click="exportPDF()"> 导出 PDF </el-button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
})
export default class exportPDF extends Vue {
  htmlTitle = '页面导出PDF文件名'
  option = {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    title: {
      text: "Traffic Sources",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: [
        "Direct",
        "Email",
        "Ad Networks",
        "Video Ads",
        "Search Engines",
      ],
    },
    series: [
      {
        name: "Traffic Sources",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "Direct" },
          { value: 310, name: "Email" },
          { value: 234, name: "Ad Networks" },
          { value: 135, name: "Video Ads" },
          { value: 1548, name: "Search Engines" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
  // 导出pdf
  exportPDF () {
    (this as any).getPdf()
  }
}
</script>
<style lang="scss">
  .export-PDF {
  }
</style>