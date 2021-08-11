import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/homePage',
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        meta: {index: 0},
        component: () => import(/* webpackChunkName: "homePage" */ '../views/modules/homePage.vue')
      },
      {
        path: '/canvasPage',
        name: 'canvasPage',
        meta: {index: 1},
        component: () => import(/* webpackChunkName: "canvasPage" */ '../views/modules/canvasPage.vue')
      },
      {
        path: '/watermark',
        name: 'watermark',
        meta: {index: 2},
        component: () => import(/* webpackChunkName: "watermark" */ '../views/modules/watermark.vue')
      },
      {
        path: '/debounceThrottle',
        name: 'debounceThrottle',
        meta: {index: 3},
        component: () => import(/* webpackChunkName: "debounceThrottle" */ '../views/modules/debounceThrottle.vue')
      },
      {
        path: '/closure',
        name: 'closure',
        meta: {index: 4},
        component: () => import(/* webpackChunkName: "closure" */ '../views/modules/closure.vue')
      },
      {
        path: '/imageCropping',
        name: 'imageCropping',
        meta: {index: 5},
        component: () => import(/* webpackChunkName: "imageCropping" */ '../views/modules/imageCropping.vue')
      },
      {
        path: '/calendar',
        name: 'calendar',
        meta: {index: 6},
        component: () => import(/* webpackChunkName: "calendar" */ '../views/modules/calendar.vue')
      },
      {
        path: '/flex',
        name: 'flex',
        meta: {index: 7},
        component: () => import(/* webpackChunkName: "flex" */ '../views/modules/flex.vue')
      },
      {
        path: '/exportPDF',
        name: 'exportPDF',
        meta: {index: 8},
        component: () => import(/* webpackChunkName: "exportPDF" */ '../views/modules/exportPDF.vue')
      },
      {
        path: '/bubbleSort',
        name: 'bubbleSort',
        meta: {index: 9},
        component: () => import(/* webpackChunkName: "bubbleSort" */ '../views/modules/bubbleSort.vue')
      },
      {
        path: '/mock',
        name: 'mock',
        meta: {index: 10},
        component: () => import(/* webpackChunkName: "mock" */ '../views/modules/mock.vue')
      },
      {
        path: '/async',
        name: 'async',
        meta: {index: 11},
        component: () => import(/* webpackChunkName: "async" */ '../views/modules/async.vue')
      },
      {
        path: '/ES6class',
        name: 'ES6class',
        meta: {index: 12},
        component: () => import(/* webpackChunkName: "ES6class" */ '../views/modules/ES6class.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
