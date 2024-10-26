import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { useCreateRouter } from './router'
import { createPinia } from 'pinia'
import { generateRandomError } from '@/utils/useAlerts'


createApp(App).use(useCreateRouter()).use(createPinia()).mount('#app')


generateRandomError()