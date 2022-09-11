import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import mavonEditor from 'mavon-editor';

import './assets/main.css'
import './assets/font-awesome/css/font-awesome.min.css'
import 'mavon-editor/dist/css/index.css';

const app = createApp(App)
app.use(mavonEditor);
app.use(router)
app.mount('#app')