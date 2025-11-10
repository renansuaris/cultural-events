<template>
  <main>
    <h1>Criar Novo Evento</h1>
    <p>Preencha o formulário abaixo para divulgar seu evento cultural.</p>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título do Evento:</label>
        <input type="text" id="title" v-model="title" />
        <p v-if="titleError" class="error">{{ titleError }}</p>
      </div>
      <div class="form-group">
        <label for="date">Data e Hora:</label>
        <input type="text" id="date" v-model="date" placeholder="ex: 10/12/2025 às 19:00" />
         <p v-if="dateError" class="error">{{ dateError }}</p>
      </div>
      <div class="form-group">
        <label for="location">Local:</label>
        <input type="text" id="location" v-model="location" />
         <p v-if="locationError" class="error">{{ locationError }}</p>
      </div>
      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description" rows="5"></textarea>
      </div>

       <button type="submit">Criar Evento</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { useRouter } from 'vue-router'

const title = ref('')
const date = ref('')
const location = ref('')
const description = ref('')

const titleError = ref('')
const dateError = ref('')
const locationError = ref('')

const eventStore = useEventStore()
const router = useRouter()

async function handleSubmit() {
  if (title.value === '') {
    titleError.value = 'O título é obrigatório.'
    return 
  } 
  if (date.value === '') {
    dateError.value = 'A data e hora são obrigatórias.'
    return
  }
  if (location.value === '') {
    locationError.value = 'O local é obrigatório.'
    return
  }
  titleError.value = ''
  dateError.value = ''
  locationError.value = ''

  const eventData = {
    title: title.value,
    date: date.value,
    location: location.value,
    description: description.value,
  }
  
  const success = await eventStore.createEvent(eventData)

  if (success) {
    router.push({ name: 'home' })
  } else {
    alert('Ocorreu um erro ao criar o evento.')
  }
}
</script>

<style scoped>

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>