import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/css/index.less'
import App from '@/App.vue'
import router from './router'
import pinia from './store'
import '@/service/config'

createApp(App).use(router).use(pinia).mount('#app')
