<script setup lang="ts">
import { useMessagesStore } from '@/stores/messages';
import { initFlowbite } from 'flowbite'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

defineProps(['messages'])
const emit = defineEmits(['close'])

const messages_store = useMessagesStore()
const { content_messages, loadingMessage } = storeToRefs(messages_store)

const selectedMessageIndex = ref()

const handleGetMessage = (message_index: number, message: any) => {
  selectedMessageIndex.value = message_index
  if (content_messages.value.find((m: any) => message.link === m.link)) return
  messages_store.getMessage(message.course_index, encodeURI(message.link))
}
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>
<template>
  <div class="absolute h-screen top-0 w-full bg-[var(--tg-theme-bg-color)]">
    <div class="w-full">
      <button @click="emit('close')" class="p-2">
        <svg class="w-6 h-6 text-[var(--tg-theme-hint-color)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4" />
        </svg>
      </button>
    </div>
    <div id="accordion-collapse" data-accordion="collapse">
      <template v-for="(message, key) in messages" :key="key">
        <h2 :id="`accordion-collapse-heading-${key}`">
          <button @click="handleGetMessage(key, message)" type="button"
            class="flex text-[var(--tg-theme-text-color)] items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0  border-gray-700 text-gray-400 bg-[var(--tg-theme-secondary-bg-color)] hover:bg-gray-800 gap-3"
            :data-accordion-target="`#accordion-collapse-body-${key}`" aria-expanded="false"
            :aria-controls="`#accordion-collapse-body-${key}`">
            <div class="text-left">
              <span>{{ message.title }}</span><br>
              <span class="text-xs text-[var(--tg-theme-hint-color)]">{{ message.date }}</span>
            </div>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div :id="`accordion-collapse-body-${key}`" class="hidden"
          :aria-labelledby="`accordion-collapse-heading-${key}`">
          <template v-if="loadingMessage">
            <div class="h-32 flex items-center justify-center">
              <div class="loader2"></div>
            </div>
          </template>
          <div v-else class="p-5 border border-b-0 border-gray-700 text-[var(--tg-theme-hint-color)] overflow-auto">
            <div v-html="content_messages.find((m: any) => message.link === m.link)?.content"></div>
          </div>
        </div>
      </template>
    </div>
  </div>

</template>