import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueMarkdownEditor from '@kangc/v-md-editor'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'

import './assets/main.css'
import './assets/font-awesome/css/font-awesome.min.css'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)
app.use(router)
app.use(VueMarkdownEditor);
app.config.globalProperties.$httpUrl = "http://43.143.184.111:8080"
app.mount('#app')