import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/ChartView.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('../views/CityView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
