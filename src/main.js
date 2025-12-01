import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import './assets/main.css' 
import LazyImage from './components/LazyImage.vue'


const app = createApp(App)


const pinia = createPinia()
app.use(pinia)
app.use(MotionPlugin)
app.use(router) 
app.component('LazyImage', LazyImage)
app.mount('#app')

