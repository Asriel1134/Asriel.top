import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'
import './assets/font-awesome/css/font-awesome.min.css'

const app = createApp(App)
app.use(router)
app.mount('#app')