<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAlertStore } from './stores/alert';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore()
const { alerts } = storeToRefs(alertStore)

</script>

<template>
  <RouterView />
  <template v-if="alerts">
    <div v-for="(alert, key) in alerts" :key="key"
      class="absolute bottom-10 right-10 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert">
      {{ alert.msg }}
    </div>
  </template>
</template>

<style scoped></style>
