import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import SignUp from '../pages/SignUp.vue'
import HairCollection from '../pages/HairCollection.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/login', name: 'Login', component: Login },
  { path: '/wigs', name: 'Wigs', component: HairCollection },
  // add other routes here
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
