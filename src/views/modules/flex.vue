<template>
  <div class="flex">
    <div class="container flex-direction">
      <h3> flex-direction 属性决定主轴的方向（即项目的排列方向）。 </h3>
      <p> flex-direction-row </p>
      <div class="flex-direction-row">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> flex-direction-row-reverse </p>
      <div class="flex-direction-row-reverse">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> flex-direction-column </p>
      <div class="flex-direction-column">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> flex-direction-column-reverse </p>
      <div class="flex-direction-column-reverse">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
    </div>

     <div class="container flex-wrap">
      <h3> flex-wrap 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。 </h3>
      <p> flex-wrap-nowrap </p>
      <div class="flex-wrap-nowrap">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> flex-wrap-wrap </p>
      <div class="flex-wrap-wrap">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
      
      <p> flex-wrap-wrap-reverse </p>
      <div class="flex-wrap-wrap-reverse">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
    </div>

    <div class="container justify-content">
      <h3> justify-content属性定义了项目在主轴上的对齐方式 </h3>
      <p> justify-content-flex-start </p>
      <div class="justify-content-flex-start">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> justify-content-flex-end </p>
      <div class="justify-content-flex-end">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> justify-content-center </p>
      <div class="justify-content-center">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> justify-content-space-between </p>
      <div class="justify-content-space-between">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
      <p> justify-content-space-around </p>
      <div class="justify-content-space-around">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
    </div>

    <div class="container align-items">
      <h3> align-items属性定义项目在交叉轴上如何对齐。 </h3>
      <p> align-items-flex-start </p>
      <div class="align-items-flex-start">
        <div :style="{'height': 10 * (item + 1) + 'px'}" class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-items-flex-end </p>
      <div class="align-items-flex-end">
        <div :style="{'height': 10 * (item + 1) + 'px'}" class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-items-center </p>
      <div class="align-items-center">
        <div :style="{'height': 10 * (item + 1) + 'px'}" class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-items-stretch </p>
      <div class="align-items-stretch">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-items-baseline </p>
      <div class="align-items-baseline">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
    </div>

    <div class="container align-content">
      <h3> align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 </h3>
      <p> align-content-flex-start </p>
      <div class="align-content-flex-start">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-content-flex-end </p>
      <div class="align-content-flex-end">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-content-center </p>
      <div class="align-content-center">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-content-stretch </p>
      <div class="align-content-stretch">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-content-space-between </p>
      <div class="align-content-space-between">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>

      <p> align-content-space-around </p>
      <div class="align-content-space-around">
        <div class="item" v-for="item in 6" :key="item"> {{ item }} </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
})
export default class flex extends Vue {
}
</script>
<style lang="scss">
  .flex {
    .container>p {
      margin: 10px 0;
    }
    .container>div {
      display: flex;
    }
    .item {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin: 10px;
      background: #CDE9FE;
      border-radius: 5px;
      color: #409BEA;
    }
    
    .flex-direction-row {
      flex-direction: row;
    }
    .flex-direction-row-reverse {
      flex-direction: row-reverse;
    }
    .flex-direction-column {
      flex-direction: column;
    }
    .flex-direction-column-reverse {
      flex-direction: column-reverse;
    }

    .flex-wrap {
      .flex-wrap-nowrap {
        width: 300px;
        flex-wrap: nowrap；
      }
      .flex-wrap-wrap {
        width: 300px;
        flex-wrap: wrap
      }
      .flex-wrap-wrap-reverse {
        width: 300px;
        flex-wrap: wrap-reverse
      }
    }
    
    .justify-content {
      .justify-content-flex-start {
        justify-content: flex-start;
      }
      .justify-content-flex-end {
        justify-content: flex-end;
      }
      .justify-content-center {
        justify-content: center;
      }
      .justify-content-space-between {
        justify-content: space-between;
      }
      .justify-content-space-around {
        justify-content: space-around;
      }
    }

    .align-items {
      .align-items-flex-start {
        align-items: flex-start;
      }
      .align-items-flex-end {
        align-items: flex-end;
      }
      .align-items-center {
        align-items: center;
      }
      .align-items-stretch {
        align-items: stretch;
        height: 100px;
        .item {
          height: auto;
        }
      }
      .align-items-baseline {
        align-items: baseline;
        .item:first-child {
          line-height: 80px;
        }
      }
    }

    .align-content {
      .align-content-flex-start {
        flex-wrap: wrap;
        align-content: flex-start;
        width: 300px;
        height: 300px;
      }
      .align-content-flex-end {
        flex-wrap: wrap;
        align-content: flex-end;
        width: 300px;
        height: 300px;
      }
      .align-content-center {
        flex-wrap: wrap;
        align-content: center;
        width: 300px;
        height: 300px;
      }
      .align-content-stretch {
        flex-wrap: wrap;
        align-content: stretch;
        width: 300px;
        height: 300px;
        .item {
          height: auto;
        }
      }
      .align-content-space-between {
        flex-wrap: wrap;
        align-content: space-between;
        width: 300px;
        height: 300px;
      }
      .align-content-space-around {
        flex-wrap: wrap;
        align-content: space-around;
        width: 300px;
        height: 300px;
      }
    }
  }
</style>