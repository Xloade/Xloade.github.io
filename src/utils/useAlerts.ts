import { defineStore } from 'pinia'
import { delay, randomInteger } from '@/utils/utils'

export interface Alert {
  type: 'error' | 'info' | 'warning' | 'success'
  title: string
  message: string
  timestamp: number
  lifeTime: number
  uuid: string
}

const Titles: Record<Alert['type'], string> = {
  error: 'Error', 
  info: 'Info',
  success: 'Success',
  warning: 'Warning'
}

export const useAlertsStore = defineStore('alerts', {
  state: () => ({ alerts: [] as Alert[] }),
  actions: {
    pushAlert(type: Alert['type'], message: string, title?: string, lifeTime = 5000) {
      this.alerts.push({ type, message, lifeTime, timestamp: Date.now(), uuid: self.crypto.randomUUID(), title: title ?? Titles[type] })
    },
  },
})


const randomErrors: ({ type: Alert['type'], message: string } | (() => { type: Alert['type'], message: string }))[] = [
  { type: 'warning', message: 'Browsers\'s rng is out of sync with cosmic noise. Some errors might be pseudo-random.' },
  { type: 'warning', message: 'System does not support ternary operations. It could impact calculation accuracy.' },
  { type: 'warning', message: 'Hardware acceleration for 4D rendering could not be found. Some functions might be unavailable.' },
  { type: 'error', message: 'Failed to reboot system.' },
  { type: 'warning', message: 'System has a finite amount of RAM. Some mathematical problems can not be solved.' }
]
export async function generateRandomError() {
  const alerts = useAlertsStore()
  if (Math.random() > 0.33) return
  await delay(3000)
  const randomAlert = randomErrors[randomInteger(0, randomErrors.length - 1)]
  const randomResolve = typeof randomAlert === 'function' ? randomAlert() : randomAlert
  alerts.pushAlert(randomResolve.type, randomResolve.message)
}