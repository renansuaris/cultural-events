<template>
  <main class="edit-event-container">
    <h1>Editar Evento</h1>

    <div v-if="eventStore.currentEvent">
      <EventForm 
        buttonText="Salvar Alterações"
        :isLoading="isLoading"
        :initialData="eventData"
        @submit="handleUpdate"
      />
    </div>

    <div v-else class="loading">
      <p>Carregando dados do evento...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event.store'
import EventForm from '@/components/EventForm.vue'

const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

const eventData = computed(() => {
  const evt = eventStore.currentEvent
  if (!evt) return undefined

  return {
    title: evt.title,
    categoryId: evt.categoryId,
    date: evt.date,
    location: evt.location,
    description: evt.description
  }
})

onMounted(async () => {
  const eventId = route.params.id as string
  await eventStore.fetchEventById(eventId)
})

async function handleUpdate(formData: any) {
  isLoading.value = true
  const eventId = route.params.id as string
  
  const success = await eventStore.updateEvent(eventId, formData)
  
  if (success) {
    alert('Evento atualizado com sucesso!')
    router.push({ name: 'event-details', params: { id: eventId } })
  } else {
    alert('Erro ao atualizar evento.')
  }
  isLoading.value = false
}
</script>

<style scoped>
.edit-event-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
.loading {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}
</style>