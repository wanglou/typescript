import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/index.scss';
import htmlToPdf from '@/utils/htmlToPdf';
import "echarts";
import ECharts from 'vue-echarts'
import { Home } from '@icon-park/vue'
import '@/utils/dialog'

Vue.config.productionTip = false

// 全局注册组件（也可以使用局部注册）
Vue.component('v-chart', ECharts)
Vue.component('Home', Home)
Vue.use(htmlToPdf)

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
