import { marketRoutes } from '@/modules/market/routes'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [...marketRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
