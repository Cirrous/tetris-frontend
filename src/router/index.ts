import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ShopView from '@/views/ShopView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'Game',
      component: GameView
    },

    {
      path: '/shop',
      name: 'Shop',
      component: ShopView
    },

    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: LeaderboardView
    },

    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    }
  ]
})

export default router
