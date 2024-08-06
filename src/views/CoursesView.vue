<script setup lang="ts">
import MessagesContainer from '@/components/MessagesContainer.vue';
import { useAlertStore } from '@/stores/alert';
import { onMounted, ref } from 'vue';

const { addAlert } = useAlertStore()

const COURSES_URL = 'https://sjouxngiheltsewvb2266mefxq0lqgln.lambda-url.us-east-2.on.aws/'
const courses = ref<any>([])
const loading = ref(false)
const selectedCourseIndex = ref()

onMounted(() => {
    loading.value = true
    fetch(COURSES_URL).then(res => res.json())
        .then(data => courses.value = data)
        .catch(e => addAlert(e.toLocaleString()))
        .finally(() => loading.value = false)
})
</script>
<template>
    <div class="grid gap-3 items-center justify-center h-screen content-center">

        <template v-if="loading">
            <div class="loader"></div>
        </template>
        <div @click="selectedCourseIndex = key"
            class="cursor-pointer p-4 rounded overflow-hidden shadow-lg bg-[var(--tg-theme-secondary-bg-color)]" v-else
            v-for="(course, key) in courses" :key="key">
            <div class="px-6 py-4">
                <h1 class="font-bold text-lg mb-2 text-nowrap">{{ course.name }}</h1>
                <p class="text-sm text-[var(--tg-theme-hint-color)]"><b>{{ course.messages_count }}</b> Mensajes
                    pendientes</p>
            </div>
        </div>
        <MessagesContainer v-if="selectedCourseIndex" :messages="courses[selectedCourseIndex].messages" />
    </div>

</template>