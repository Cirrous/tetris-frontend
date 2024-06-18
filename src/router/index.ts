import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import ShopView from '@/views/ShopView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

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
      path: '/login',
      name: 'Login',
      component: LoginView
    },

    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ]
})

export default router
