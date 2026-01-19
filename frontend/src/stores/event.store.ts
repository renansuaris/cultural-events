import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import EventService from '@/services/EventService'
import type { Event, CreateEventDTO, UpdateEventDTO } from '@/types'

export const useEventStore = defineStore('event', () => {
  
  const events = ref<Event[]>([])
  const currentEvent = ref<Event | null>(null)
  const myEvents = ref<Event[]>([])

  const page = ref(1)
  const totalPages = ref(1)

  async function fetchAllEvents(categoryId?: string, pageNumber = 1, limit = 6) {
    try {
      const params = new URLSearchParams()
      params.append('page', pageNumber.toString())
      params.append('limit', limit.toString()) 
        
      if (categoryId) {
        params.append('categoryId', categoryId)
      }

      const data = await EventService.getAll(params)
        
      events.value = data.data
      page.value = data.page
      totalPages.value = data.lastPage
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchEventById(id: string) {
    currentEvent.value = null 
    try {
      const data = await EventService.getById(id)
      currentEvent.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createEvent(eventData: CreateEventDTO) {
    await EventService.create(eventData)
    await fetchAllEvents()
    
    return true
  }

  async function fetchMyEvents() {
    const authStore = useAuthStore()
    const currentUserId = authStore.userId

    if (!currentUserId) return 

    const { data } = await EventService.getAll(new URLSearchParams(`userId=${currentUserId}&limit=100`))
    myEvents.value = data
  }

  async function updateEvent(id: string, eventData: UpdateEventDTO) {
    await EventService.update(id, eventData)
    await fetchMyEvents() 
  }

  async function deleteEvent(id: string) {
    await EventService.delete(id)
    events.value = events.value.filter(e => e.id !== id)
    myEvents.value = myEvents.value.filter(e => e.id !== id)
    await fetchMyEvents() 
  }

  return { 
    events, 
    page, 
    totalPages,
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