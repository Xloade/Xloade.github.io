<template>
  <div class="flex flex-col items-center mt-60 w-full">
    <div class="flex flex-col gap-2">
      <div class="w-64 flex justify-between">
        <Transition name="backBtn">
          <RouterLink
            v-show="!isRoot"
            to="/"
            class="text-cente py-1 -my-1 px-3 -mx-3"
          >
            &lt;
          </RouterLink>
        </Transition>
        <TransitionGroup
          name="breadItems"
          tag="div"
          class="flex gap-1 ml-auto"
        >
          <div
            v-for="(breadCrum, index) in bread"
            :key="breadCrum.path"
            class="flex gap-1"
          >
            <div>
              {{ breadCrum.name }}
            </div>
            <div v-if="index + 1 < bread.length">
              /
            </div>
          </div>
        </transitiongroup>
      </div>

      <TransitionGroup
        name="menuItems"
        tag="nav"
        class="flex flex-col gap-3 my-2"
      >
        <div
          v-for="route in filteredRoutes"
          :key="route.path"
          class="w-64 flex bg-orange-600"
        >
          <RouterLink
            :to="{name: route.name}"
            class="p-2 text-lg w-full text-center bg-cyan-950 transition-transform hover:translate-x-1 hover:translate-y-1 shadow-sm"
          >
            {{ route.name }}
          </RouterLink>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const currRoute = useRoute()
const router = useRouter()
const routes = router.getRoutes()

const isRoot = computed(() => currRoute.path === '/')

const doNotShow = ['NotFound', 'Menu']
const filteredRoutes = computed(() =>
  routes.filter(route =>
    !doNotShow.includes(route.name?.toString() ?? '') &&
    new RegExp(`^${isRoot.value  ? '' : currRoute.path}/[a-zA-Z-]+$`).test(route.path)
  )
)

const bread = computed(() => {
  const parts = currRoute.path.split('/').filter(e => e)
  return parts.reduce((acc, curr) => {
    acc.builder += curr
    acc.paths.push(routes.find(e => e.path === acc.builder)!)
    return acc
  },{builder: '/', paths:[routes.find(e => e.path === '/')!]}).paths
})
</script>

<style scoped>
.menuItems-move, /* apply transition to moving elements */
.menuItems-enter-active,
.menuItems-leave-active {
  transition: all 0.5s ease;
}

.menuItems-enter-from,
.menuItems-leave-to {
  opacity: 0;
  filter: grayscale(100%);
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.menuItems-leave-active {
  position: absolute;
}

.backBtn-move, /* apply transition to moving elements */
.backBtn-enter-active,
.backBtn-leave-active {
  transition: all 0.5s ease;
}

.backBtn-enter-from,
.backBtn-leave-to {
  opacity: 0;
}

.breadItems-move, /* apply transition to moving elements */
.breadItems-enter-active,
.breadItems-leave-active {
  transition: all 0.5s ease;
}

.breadItems-enter-from,
.breadItems-leave-to {
  opacity: 0;
  filter: grayscale(100%);
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.breadItems-leave-active {
  position: absolute;
}
</style>