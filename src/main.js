import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './i18n'
// import i18n from './i18n'
// import alertPlugin from './plugins/alertPlugin'

createApp(App).use(router).use(createPinia()).use(i18n).mount('#app')
