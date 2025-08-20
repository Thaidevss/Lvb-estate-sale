import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import alertPlugin from './plugins/alertPlugin'

createApp(App).use(router).use(createPinia()).mount('#app')
