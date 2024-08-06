import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Alert {
  msg: string
}

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])
  function addAlert(msg: string) {
    alerts.value.push({ msg })
  }

  return { addAlert, alerts }
})
