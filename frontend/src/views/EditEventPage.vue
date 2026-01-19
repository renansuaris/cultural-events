<template>
  <main class="edit-event-container">
    <h1>Editar Evento</h1>

    <div v-if="eventStore.currentEvent">
      <EventForm 
        buttonText="Salvar Alterações"
        :isLoading="isLoading"
        :initialData="eventData"
        :serverErrors="errors"
        @submit="handleUpdate"
      />
    </div>

    <div v-else class="loading">
      <p>Carregando dados do evento...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event.store'
import { useToast } from 'vue-toastification'
import EventForm from '@/components/EventForm.vue'
import { useFormHandler } from '@/composables/useFormHandler'

const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const { isLoading, errors, execute } = useFormHandler()

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
  const eventId = route.params.id as string;
  await execute(
    () => eventStore.updateEvent(eventId, formData),
    () => {
      toast.success("Evento atualizado com sucesso!");
      router.push({ name: 'event-details', params: { id: eventId } });
    }
  );
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