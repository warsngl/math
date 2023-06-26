import { createApp } from 'vue'
import { createRouter,createWebHashHistory } from 'vue-router'

import store from './store'
import App from './App.vue'
import './assets/index.css'
import Main from './components/Main.vue'
import Settings from './components/Settings.vue'

const routes=[
  {path:'/', component: Main},
  {path:'/settings', component: Settings},
]
const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

createApp(App).use(router).use(store).mount('#app')
