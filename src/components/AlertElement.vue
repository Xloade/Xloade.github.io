<template>
  <div class="fixed right-4 bottom-10">
    <TransitionGroup
      name="alertList"
      tag="div"
      class="flex flex-col gap-2"
    >
      <div
        v-for="alert in alertStore.alerts"
        :key="alert.uuid"
        class="w-80 p-1 rounded-sm bg-slate-700 pl-8"
      >
        <div
          :class="{
            'bg-red-400': alert.type === 'error',
            'bg-green-400': alert.type === 'success',
            'bg-orange-400': alert.type === 'warning',
            'bg-blue-400': alert.type === 'info'
          }"
          class="absolute top-0 h-full left-2 w-1"
        />
        <div class="text-lg">
          {{ alert.title }}
        </div>
        <div class="text-sm">
          {{ alert.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlertsStore } from '@/utils/useAlerts';
import { useTimestamp } from '@vueuse/core';
import { watch } from 'vue';

const alertStore = useAlertsStore()

const currTime = useTimestamp({interval: 100})

watch(currTime, () => {
  alertStore.alerts = alertStore.alerts.filter(alert => alert.timestamp + alert.lifeTime > currTime.value)
})

</script>

<style lang="css" scoped>
.alertList-move, /* apply transition to moving elements */
.alertList-enter-active,
.alertList-leave-active {
  transition: all 0.5s ease;
}

.alertList-enter-from,
.alertList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.alertList-leave-active {
  position: absolute;
}
</style>