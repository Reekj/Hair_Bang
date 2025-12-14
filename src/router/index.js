import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import SignUp from '../pages/SignUp.vue'
import HairCollection from '../pages/HairCollection.vue'
import Accessories from '../pages/Accessories.vue'
import Jeans from '../pages/Jeans.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import Admin from '../pages/Admin.vue'
import Cart from '../pages/Cart.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/login', name: 'Login', component: Login },
  { path: '/wigs', name: 'Wigs', component: HairCollection },
  { path: '/accessories', name: 'Accessories', component: Accessories },
  { path: '/jeans', name: 'Jeans', component: Jeans },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/shipping', name: 'Shipping', component: () => import('../pages/Shipping.vue') },
  { path: '/privacy', name: 'Privacy', component: () => import('../pages/Privacy.vue') },
  { path: '/terms-condition', name: 'TermsAndCondition', component: () => import('../pages/TermsAndConditions.vue') },
  { path: '/refund', name: 'RefundPolicy', component: () => import('../pages/RefundPolicy.vue') },
  { path:'/contact-us', name: 'ContactUs', component: () => import('../pages/Contact.vue') },
  { path:'/FAQ', name: 'FAQ', component: () => import('../pages/FAQ.vue') },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
