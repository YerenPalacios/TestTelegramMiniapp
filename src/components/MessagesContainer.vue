<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { onMounted } from 'vue';
defineProps(['messages'])


// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>
<template>
    <div class="absolute h-screen w-full bg-[var(--tg-theme-bg-color)]">
        <!-- <div class="bg-[var(--tg-theme-secondary-bg-color)] p-4 shadow-lg" v-for="(message, key) in messages"
            :key="key">
            <h1>{{ message.title }}</h1>
        </div> -->
        <div v-for="(message, key) in messages" :key="key" data-accordion="collapse">
            <h2 :id="`accordion-collapse-heading-${key}`">
                <button type="button"
                    class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                    :data-accordion-target="`#accordion-collapse-body-${key}`" aria-expanded="false"
                    aria-controls="accordion-collapse-body-1">
                    <span>{{ message.title }}</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div :id="`accordion-collapse-body-${key}`" class="hidden"
                :aria-labelledby="`accordion-collapse-heading-${key}`">
                <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p class="text-sm text-[var(--tg-theme-hint-color)] w-full text-right mb-2">{{ message.date }}</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive
                        components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a
                            href="/docs/getting-started/introduction/"
                            class="text-[var(--tg-theme-button-color) hover:underline">get started</a> and start
                        developing websites even faster with components on top of Tailwind CSS.</p>
                </div>
            </div>
        </div>
    </div>

</template>