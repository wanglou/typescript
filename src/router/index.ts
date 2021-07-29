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
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/homePage.vue')
      },
      {
        path: '/canvasPage',
        name: 'canvasPage',
        meta: {index: 1},
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/canvasPage.vue')
      },
      {
        path: '/watermark',
        name: 'watermark',
        meta: {index: 2},
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/watermark.vue')
      },
      {
        path: '/debounceThrottle',
        name: 'debounceThrottle',
        meta: {index: 3},
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/debounceThrottle.vue')
      },
      {
        path: '/closure',
        name: 'closure',
        meta: {index: 4},
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/closure.vue')
      },
      {
        path: '/headPortrait',
        name: 'headPortrait',
        meta: {index: 5},
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/headPortrait.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
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
