<template>
  <main>
    <h1>Editar Evento</h1>
    
    <p v-if="isLoading">Carregando dados do evento...</p>
    
    <form v-else-if="hasPermission" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título do Evento:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div class="form-group">
        <label for="date">Data e Hora:</label>
        <input type="text" id="date" v-model="date" placeholder="ex: 10/12/2025 às 19:00" />
      </div>
      <div class="form-group">
        <label for="location">Local:</label>
        <input type="text" id="location" v-model="location" />
      </div>
      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description" rows="5"></textarea>
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>
    
    <p v-else>Você não tem permissão para ver esta página ou o evento não foi encontrado.</p>
  </main>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useEventStore, type IEvent } from '@/stores/event.store'
import { useAuthStore } from '@/stores/auth'

const title = ref('')
const date = ref('')
const location = ref('')
const description = ref('')

const isLoading = ref(true)
const hasPermission = ref(false)

const route = useRoute() 
const router = useRouter() 
const eventStore = useEventStore()
const authStore = useAuthStore()

const eventId = route.params.id as string

onMounted(async () => {
  await eventStore.fetchEventById(eventId)
  
  const event = eventStore.currentEvent as IEvent | null
  
  if (!event) {
    isLoading.value = false
    alert('Evento não encontrado.')
    router.push({ name: 'home' }) 
    return
  }

  const usuarioLogadoId = authStore.userId
  const ehAdmin = authStore.isAdmin
  
  if (event.userId !== usuarioLogadoId && !ehAdmin) {
    isLoading.value = false
    hasPermission.value = false 
    alert('Você não tem permissão para editar este evento.')
    router.push({ name: 'my-events' })
    return
  }
  
  isLoading.value = false
  hasPermission.value = true 
  
  title.value = event.title
  date.value = event.date
  location.value = event.location
  description.value = event.description
})

async function handleSubmit() {
  if (title.value === '') {
    alert('O título é obrigatório.')
    return
  }
  
  const eventData = {
    title: title.value,
    date: date.value,
    location: location.value,
    description: description.value
  }

  const success = await eventStore.updateEvent(eventId, eventData)

  if (success) {
    alert('Evento atualizado com sucesso!')
    router.push({ name: 'my-events' })
  } else {
    alert('Ocorreu um erro ao atualizar o evento.')
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
}
input[type='text'],
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; 
}
button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>