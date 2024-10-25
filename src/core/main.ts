import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { useCreateRouter } from './router'


createApp(App).use(useCreateRouter()).mount('#app')
