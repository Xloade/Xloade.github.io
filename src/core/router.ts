import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '@/pages/notFound/notFound.vue'
import Starter from '@/pages/menu/menu.vue'

export const routes: RouteRecordRaw[] = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', name: 'Menu', component: Starter },
    { path: '/aaa', name: 'aaaa', component: Starter },
    { path: '/bbb', name: 'bbb', component: Starter },
]

export function useCreateRouter() {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })
    return router
}   
