import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '@/pages/notFound/notFound.vue'
import TodoPage from '@/pages/todoPage.vue'
import MainMenu from '@/pages/menu/mainMenu.vue'

export const routes: RouteRecordRaw[] = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
        path: '/', name: 'Menu', component: MainMenu,
    },
    {
        path: '/experiments',
        children: [
            { path: '', component: MainMenu, name: 'Experiments' },
            { path: 'file-chomper', name: 'File Chomper', component: TodoPage }
        ]
    },
    {
        path: '/tools',
        children: [
            { path:'', name: 'Tools', component: MainMenu },
            { path: 'notepad', name: 'Notepad', component: TodoPage },
        ]
    }
]

export function useCreateRouter() {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })
    return router
}   
