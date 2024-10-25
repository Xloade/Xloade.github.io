<template>
    <div class="flex items-center justify-center w-full h-screen">
        <nav class="p-2 flex flex-col gap-2 m-2">
            <RouterLink v-for="route in filteredRoutes" :to="route.path"
                class="text-lg w-52 text-center bg-cyan-950 transition-transform hover:translate-x-2">
                {{ route.name }}
            </RouterLink>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { routes } from '@/core/router'

const doNotShow = ['NotFound', 'Menu']
const filteredRoutes = routes.filter(route => !doNotShow.includes(route.name?.toString()!))
</script>