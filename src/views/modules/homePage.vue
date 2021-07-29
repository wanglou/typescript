<template>
  <div class="home-page">
    <el-button type="primary" size="mini" @click="triggerVuex"> vuex触发消息提示 </el-button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { mapActions } from 'vuex'
// Define the component in class-style
@Component({
  created () {
  },
  methods: {
    ...mapActions({
      triggerVuex: 'user/changeInfo'
    })
  }
})
export default class homePage extends Vue {
}
</script>
<style lang="scss">
  .home-page {
  }
</style>