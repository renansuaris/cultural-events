<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Criar Novo Evento</h1>
      <p>Preencha o formulário abaixo para divulgar seu evento cultural.</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Título do Evento:</label>
          <input type="text" id="title" v-model="title" />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>
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
          <p v-if="errors.category" class="error">{{ errors.category }}</p>
        </div>

        <div class="form-group">
          <label for="date">Data e Hora:</label>
          <input type="text" id="date" v-model="date" placeholder="ex: 10/12/2025 às 19:00" />
          <p v-if="errors.date" class="error">{{ errors.date }}</p>
        </div>

        <div class="form-group">
          <label for="location">Local:</label>
          <input type="text" id="location" v-model="location" />
          <p v-if="errors.location" class="error">{{ errors.location }}</p>
        </div>

        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea id="description" v-model="description" rows="5"></textarea>
        </div>

        <button type="submit" class="btn-submit">Criar Evento</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { useCategoryStore } from '@/stores/category.store'
import { useRouter } from 'vue-router'

const title = ref('')
const date = ref('')
const location = ref('')
const description = ref('')
const selectedCategory = ref('')

const errors = reactive({
  title: '',
  date: '',
  location: '',
  category: ''
})

const eventStore = useEventStore()
const categoryStore = useCategoryStore()
const router = useRouter()

onMounted(() => {
  categoryStore.fetchAllCategories()
})

async function handleSubmit() {
  errors.title = ''
  errors.date = ''
  errors.location = ''
  errors.category = ''

  let isValid = true
  if (title.value === '') {
    errors.title = 'O título é obrigatório.'
    isValid = false
  }
  if (selectedCategory.value === '') {
    errors.category = 'A categoria é obrigatória.'
    isValid = false
  }
  if (date.value === '') {
    errors.date = 'A data e hora são obrigatórias.'
    isValid = false
  }
  if (location.value === '') {
    errors.location = 'O local é obrigatório.'
    isValid = false
  }

  if (!isValid) return

  const eventData = {
    title: title.value,
    date: date.value,
    location: location.value,
    description: description.value,
    categoryId: selectedCategory.value
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

.form-page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding: 2rem 1rem;
}

.form-container {
  width: 100%;
  max-width: 600px; 
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
  color: #555;
  margin-bottom: 2rem;
}

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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif; 
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-group select {
  background-color: white;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>