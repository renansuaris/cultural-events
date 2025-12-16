import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { type ICategory } from './category.store'
import api from '@/services/api'

export interface IEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  userId: string 
  categoryId: string
  category?: ICategory
}

type CreateEventData = {
  title: string
  date: string
  location: string
  description: string
  categoryId: string
}

type UpdateEventData = {
  title: string
  date: string
  location: string
  description: string
  categoryId?: string
}

export const useEventStore = defineStore('event', () => {
  
  const events = ref<IEvent[]>([])
  const currentEvent = ref<IEvent | null>(null)
  const myEvents = ref<IEvent[]>([])

  async function fetchAllEvents() {
    try {
      const { data } = await api.get('/events')
      events.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchEventById(id: string) {
    currentEvent.value = null 
    try {
      const { data } = await api.get(`/events/${id}`)
      currentEvent.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createEvent(eventData: CreateEventData) {
    try {
      await api.post('/events', eventData)
      await fetchAllEvents()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async function fetchMyEvents() {
    const authStore = useAuthStore()
    const currentUserId = authStore.userId

    if (!currentUserId) return 

    try {
      const { data } = await api.get('/events')
      
      myEvents.value = data.filter((event: IEvent) => event.userId === currentUserId)
      
    } catch (error) {
      console.error(error)
    }
  }

  async function updateEvent(id: string, eventData: UpdateEventData) {
    try {
      await api.put(`/events/${id}`, eventData)
      await fetchMyEvents() 
      return true 
    } catch (error) {
      console.error(error)
      return false 
    }
  }

  async function deleteEvent(id: string) {
    try {
      await api.delete(`/events/${id}`)
      await fetchMyEvents() 
      return true 
    } catch (error) {
      console.error(error)
      return false 
    }
  }

  return { 
    events, 
    currentEvent,
    myEvents, 
    fetchAllEvents, 
    fetchEventById,
    createEvent,
    fetchMyEvents,
    updateEvent,
    deleteEvent 
  }
})