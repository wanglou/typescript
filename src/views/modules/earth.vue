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
    const seriseData = [
       {},
       {
        name: '中国',
        lng: 111.11,
        lat: 33.33,
       }
    ]
    const canvas = document.createElement("canvas");
    const mapChart = echarts.init(canvas, null, {
      width: 4096,
      height: 2048
    });

    echarts.registerMap('world', require('@/utils/world.json'));
    mapChart.setOption({
      backgroundColor: "#054262",
      tooltip: {
        trigger: 'item'
      },
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
          ]
        }
      ]
    });
    const myCharts = echarts.init(document.getElementById("myChart"));
    myCharts.setOption({
      tooltip: {
      },
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
      series: [
        {
          name: '数据',
          type: 'scatter3D',
          coordinateSystem: 'globe',
          emphasis: {
            label: {
              show: false
            }
          },
          data: seriseData.map((v) => {
            return {
              name: v.name,
              value: [v.lng, v.lat]
            };
          })
        }
      ]
    });
  }
})
export default class earth extends Vue {}
</script>
<style lang="scss">
.earth {
}
</style>