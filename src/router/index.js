import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/SignUp',
      name: 'signup',
      component: SignUpView
    }
  ]
})

export default router
