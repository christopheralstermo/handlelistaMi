import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '@/views/FrontPage.vue'

const routes = [
  {
    path: '/',
    name: 'frontpage',
    component: FrontPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
