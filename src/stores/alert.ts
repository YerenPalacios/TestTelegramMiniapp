import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Alert {
  msg: string
}

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])
  function addAlert(msg: string) {
    alerts.value.push({ msg })

    setTimeout(() => {
      const index = alerts.value.findIndex((alert) => alert.msg === msg)
      if (index !== -1) {
        alerts.value.splice(index, 1)
      }
    }, 5000)
  }

  return { addAlert, alerts }
})
