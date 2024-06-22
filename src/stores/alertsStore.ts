// stores/alertStore.js
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    showAlert: false,
    alertMessage: ''
  }),
  actions: {
    setAlert(message:any) {
      this.alertMessage = message
      this.showAlert = true
    },
    clearAlert() {
      this.alertMessage = ''
      this.showAlert = false
    }
  }
})
