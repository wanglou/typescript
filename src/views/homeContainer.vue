<template>
  <div class="home-container">
    
    <el-container class="home-main">
      <!-- 侧边导航栏 -->
      <el-aside width="260px">
        <AsideMenu/>
      </el-aside>

      <!-- 主题页面 -->
      <el-container class="main-right">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AsideMenu from '@/views/modules/asideMenu.vue'
// Define the component in class-style
@Component({
  components: {
    AsideMenu
  },
})
export default class home extends Vue {
}
</script>
<style lang="scss">
  @import '@/assets/scss/index.scss';
  .home-container {
    // 主体
    .home-main {
      height: calc(100vh - 60px);
    }

    .el-aside {
      background: $themeColor;
    }

    .main-right {
      padding: 15px;
      .el-main {
        border-radius: 6px;
        background: #fff;
      }
    }
  }
</style>
