import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export interface IEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  userId: string 
  categoryId: string
}

type CreateEventData = {
  title: string
  date: string
  location: string
  description: string
}

type UpdateEventData = {
  title: string
  date: string
  location: string
  description: string
}

export const useEventStore = defineStore('event', () => {
  
  const events = ref<IEvent[]>([])
  const currentEvent = ref<IEvent | null>(null)
  const myEvents = ref<IEvent[]>([])
  const API_URL = 'http://localhost:3000'

  async function fetchAllEvents() {
    try {
      const response = await fetch(`${API_URL}/events`)
      if (!response.ok) {
        throw new Error('Erro ao buscar eventos')
      }
      events.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchEventById(id: string) {
    currentEvent.value = null 
    try {
      const response = await fetch(`${API_URL}/events/${id}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar o evento')
      }
      currentEvent.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async function createEvent(eventData: CreateEventData) {
    const authStore = useAuthStore()
    const currentUserId = authStore.userId

    if (!currentUserId) {
      console.error('Usuário não logado, impossível criar evento.')
      return false 
    }

    const fullEventData = {
      ...eventData,
      userId: currentUserId, 
      categoryId: '1'
    }

    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullEventData)
      })

      if (!response.ok) {
        throw new Error('Erro ao criar evento')
      }

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

    if (!currentUserId) {
      console.warn('Nenhum usuário logado para buscar "Meus Eventos".')
      return 
    }

    try {
      const response = await fetch(`${API_URL}/events?userId=${currentUserId}`)
      if (!response.ok) {
        throw new Error('Erro ao buscar "Meus Eventos"')
      }
      myEvents.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async function updateEvent(id: string, eventData: UpdateEventData) {

    if (!currentEvent.value) {
      console.error('Nenhum evento carregado para atualizar.')
      return false
    }
    const fullEventData = {
      ...currentEvent.value, 
      ...eventData             
    }

    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullEventData) 
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar evento')
      }

      await fetchMyEvents() 
      
      return true 
    } catch (error) {
      console.error(error)
      return false 
    }
  }

  async function deleteEvent(id: string) {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE' 
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar evento')
      }

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