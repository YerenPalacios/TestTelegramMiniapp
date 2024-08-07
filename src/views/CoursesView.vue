<script setup lang="ts">
import MessagesContainer from '@/components/MessagesContainer.vue';
import { onMounted, ref } from 'vue';

import { useMessagesStore } from '@/stores/messages';
import { storeToRefs } from 'pinia';

const messages_store = useMessagesStore()
const { loadingCourses, courses } = storeToRefs(messages_store)
const selectedCourseIndex = ref()

onMounted(() => {
    messages_store.getCoursesWithMessages()
})
</script>
<template>
    <div class="gap-3 items-center justify-center  content-start">

        <template v-if="loadingCourses">
            <div class="absolute h-full w-full flex items-center justify-center">

                <div class="loader"></div>
            </div>
        </template>
        <div @click="selectedCourseIndex = key"
            class="cursor-pointer mt-4 mx-4 p-4 rounded overflow-hidden shadow-lg bg-[var(--tg-theme-secondary-bg-color)]"
            v-else v-for="(course, key) in courses" :key="key">
            <div class="px-6 py-4">
                <h1 class="font-bold text-lg mb-2 text-nowrap">{{ course.name }}</h1>
                <p class="text-sm text-[var(--tg-theme-text-color)]"><b>{{ course.messages_count }}</b> Mensajes
                    pendientes</p>
            </div>
        </div>
        <MessagesContainer @close="selectedCourseIndex = undefined" v-if="selectedCourseIndex != undefined"
            :messages="courses[selectedCourseIndex].messages" />
    </div>

</template>