<template>
  <main class="form-page-container">
    <div v-if="isLoading" class="loading-msg">
      <p>Carregando dados do evento...</p>
    </div>

    <div v-else-if="hasPermission" class="form-container">
      <h1>Editar Evento</h1>
      <p>Atualize as informações do seu evento.</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Título do Evento:</label>
          <input type="text" id="title" v-model="title" />
        </div>

        <div class="form-group">
          <label for="category">Categoria:</label>
          <select id="category" v-model="selectedCategory">
            <option value="" disabled>Selecione uma categoria...</option>
            <option 
              v-for="category in categoryStore.categories" 
              :key="category.id" 
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group half-width">
            <label for="date">Data e Hora:</label>
            <input type="text" id="date" v-model="date" />
          </div>
          <div class="form-group half-width">
            <label for="location">Local:</label>
            <input type="text" id="location" v-model="location" />
          </div>
        </div>

        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea id="description" v-model="description" rows="5"></textarea>
        </div>

        <button type="submit" class="btn-submit">Salvar Alterações</button>
      </form>
    </div>

    <div v-else class="error-container">
      <p>Você não tem permissão para editar este evento.</p>
      <router-link :to="{ name: 'home' }">Voltar para Home</router-link>
    </div>
  </main>
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category.store'
import { useEventStore, type IEvent } from '@/stores/event.store'
import { useAuthStore } from '@/stores/auth'

const title = ref('')
const date = ref('')
const location = ref('')
const description = ref('')
const selectedCategory = ref('')

const isLoading = ref(true)
const hasPermission = ref(false)

const route = useRoute() 
const router = useRouter() 
const eventStore = useEventStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()

const eventId = route.params.id as string

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchAllCategories(),
    eventStore.fetchEventById(eventId)
  ])
  
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
  selectedCategory.value = event.categoryId
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
    description: description.value,
    categoryId: selectedCategory.value 
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

.form-page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 90vh;
  padding: 2rem 1rem;
  background-color: #f9f9f9;
}

.form-container {
  width: 100%;
  max-width: 700px;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

/* Campos */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #444;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
}
.half-width { flex: 1; }

.btn-submit {
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}
.btn-submit:hover { background-color: #0056b3; }

.loading-msg, .error-container {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 600px) {
  .form-row { flex-direction: column; gap: 0; }
}
</style>