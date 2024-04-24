import { createApp } from 'vue'
import { createRouter,createWebHashHistory } from 'vue-router'

import store from './store'
import App from './App.vue'
import './assets/index.css'
import './assets/main.css'
import Main from './views/Main.vue'
import Settings from './views/Settings.vue'

const routes=[
  {path:'/', component: Main},
  {path:'/settings', component: Settings},
]
const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

createApp(App).use(router).use(store).mount('#app')
