import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/styles/icon.css'
import './assets/styles/global.scss'

import router from './router'

createApp(App).use(router)
.mount('#app')
