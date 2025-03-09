interface ContentMessage {
  title: string
  content: string
}

interface ListMessage {
  course_index: number
  date: string
  link: number //TODO: change for message id
  sender: string
  title: string
}
interface CourseMessage {
  index: number
  messages: ListMessage[]
  messages_count: number
  name: string // course name
  url: string
}
