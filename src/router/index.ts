import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ShopView from '@/views/ShopView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },

    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },

    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardView
    }
  ]
})

export default router
