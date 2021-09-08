<template>
  <div class="earth">
    <div id="myChart" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as echarts from "echarts";
// Define the component in class-style
@Component({
  mounted() {
    var canvas = document.createElement("canvas");
    var mapChart = echarts.init(canvas, null, {
      width: 4096,
      height: 2048,
    });

    echarts.registerMap('world', require('@/utils/world.json'));
    mapChart.setOption({
      backgroundColor: "#044161",
      series: [
        {
          type: "map",
          map: "world",
          // 绘制完整尺寸的 echarts 实例
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90],
          ],
          itemStyle: {
            emphasis: {
                areaColor:"#EEF824",
            }
          },
        },
      ],
    });
    const myCharts = echarts.init(document.getElementById("myChart"));
    myCharts.setOption({
      backgroundColor: "#fff",
      globe: {
        baseTexture: mapChart,
        shading: "color",
        environment:
          "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data-gl/asset/starfield.jpg",
        atmosphere: {
          show: true,
        },
        viewControl: {
          autoRotate: false,
          targetCoord: [100.46, 39.92], // 定位到中国
        }
      },
      series: [],
    });
  },
})
export default class earth extends Vue {}
</script>
<style lang="scss">
.earth {
}
</style>