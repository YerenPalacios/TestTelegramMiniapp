import { ref } from 'vue'
import { defineStore } from 'pinia'

import { COURSES_URL } from '@/constants'
import { useAlertStore } from './alert'

export const useMessagesStore = defineStore('messages', () => {
  const { addAlert } = useAlertStore()

  const courses = ref<any>([])
  const content_messages = ref<any>([])
  const loadingMessage = ref(false)
  const loadingCourses = ref(false)

  function getMessage(index: number, link: string) {
    content_messages.value[link] = {}
    loadingMessage.value = true
    fetch(`${COURSES_URL}?course_index=${index}&message_url=${encodeURIComponent(link)}`)
      .then((res) => res.json())
      .then((data) => {
        content_messages.value.push({ ...data, link })
      })
      .catch((e) => addAlert(e.toLocaleString()))
      .finally(() => (loadingMessage.value = false))
  }

  function getCoursesWithMessages() {
    loadingCourses.value = true
    fetch(COURSES_URL)
      .then((res) => res.json())
      .then((data) => (courses.value = data))
      .catch((e) => addAlert(e.toLocaleString()))
      .finally(() => (loadingCourses.value = false))
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
