import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useFetch } from '@vueuse/core'

import { COURSES_URL } from '@/constants'
import { useAlertStore } from './alert'


export const useMessagesStore = defineStore('messages', () => {
  const { addAlert } = useAlertStore()

  const courses = ref<CourseMessage[]>([])
  const content_messages = ref<Record<string, ContentMessage>>({})
  const loadingMessage = ref(false)
  const loadingCourses = ref(false)

  async function getMessage(index: number, link: string) {
    loadingMessage.value = true
    const { error, data } = await useFetch(
      `${COURSES_URL}?course_index=${index}&message_url=${encodeURIComponent(link)}`
    ).json()

    content_messages.value[link] = data.value
    if (error.value) {
      addAlert(error.value.toLocaleString())
    }

    loadingMessage.value = false
  }

  async function getCoursesWithMessages() {
    loadingCourses.value = true
    const { error, data } = await useFetch(COURSES_URL).json()
    if (error.value) {
      addAlert(error.value.toLocaleString())
    }
    courses.value = data.value
    loadingCourses.value = false
  }

  return {
    loadingMessage,
    content_messages,
    getMessage,
    getCoursesWithMessages,
    loadingCourses,
    courses
  }
})
