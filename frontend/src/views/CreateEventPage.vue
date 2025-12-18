<template>
  <main class="create-event-container">
    <h1>Criar Novo Evento</h1>
    <p class="subtitle">Preencha o formulário abaixo para divulgar seu evento cultural.</p>

    <EventForm 
      buttonText="Criar Evento"
      :isLoading="isLoading"
      @submit="handleCreate"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event.store'
import EventForm from '@/components/EventForm.vue' 

const eventStore = useEventStore()
const router = useRouter()
const isLoading = ref(false)

async function handleCreate(formData: any) {
  isLoading.value = true
  const success = await eventStore.createEvent(formData)
  
  if (success) {
    alert('Evento criado com sucesso!')
    router.push({ name: 'home' })
  } else {
    alert('Erro ao criar evento. Tente novamente.')
  }
  isLoading.value = false
}
</script>

<style scoped>
.create-event-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}
</style>