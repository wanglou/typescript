<template>
  <div class="home">
    <el-container>
      <!-- 顶部header -->
      <el-header>
        <div class="user-info">
          <el-badge :value="messageValue" class="item">
            <el-button type="text" icon="el-icon-message-solid"></el-button>
          </el-badge>
          <span class="theme-color">
            主题色
            <el-color-picker size="mini" v-model="colorValue" @change="colorChange"></el-color-picker>
          </span>
          <el-dropdown>
            <span class="el-dropdown-link">
              管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="switchBtn">切换</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
        <h3> TYPESCRIPT </h3>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AsideMenu from '@/views/modules/asideMenu.vue'
import { mapState } from 'vuex'
// Define the component in class-style
@Component({
  components: {
    AsideMenu
  },
  computed: {
    // 辅助函数
    ...mapState({
      messageValue: state => (state as any).user.userInfo
    })
  }
})
export default class home extends Vue {
  colorValue: string = ''

  // 改变主题色
  colorChange (val) {
    this.$store.dispatch('user/changeColor', val)
    document.getElementsByTagName('body')[0].style.setProperty('--themeColor', val);
  }
  // 退出登录
  logout () {
    this.$router.push('/login')
  }

  // 切换
  switchBtn () {
    if (!isNaN(this.$route.meta.index)) {
      this.$router.push('/visualPlatform')
    } else {
      this.$router.push(this.$route.meta.path)
    }
  }
}
</script>
<style lang="scss">
  @import '@/assets/scss/index.scss';
  .el-dropdown-menu {
    li {
      padding: 0 20px;
    }
  }
  .home {
    background: $themeColor;
    .el-header {
      padding: 20px 20px 0;
      border-bottom: 2px solid #fff;
      h3 {
        color: #fff;
      }
      .user-info {
        float: right;
        color: #fff;
        // 消息
        .el-badge {
          margin-right: 20px;
          .el-button--text {
            color: #fff;
            font-size: 20px;
            padding: 0;
          }
        }
        // 颜色提取
        .el-color-picker {
          margin: -5px 0 0 10px;
          vertical-align: middle;
        }
        .el-dropdown {
          margin-left: 20px;
          .el-dropdown-link {
            cursor: pointer;
            color: #fff;
          }
        }
      }
    }
  }
</style>
