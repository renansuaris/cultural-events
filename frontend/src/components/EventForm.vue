<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Título do Evento:</label>
        <input 
          type="text" 
          id="title" 
          v-model="formData.title" 
          class="form-control"
          placeholder="Ex: Show de Rock no Centro"
        />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
      </div>

      <div class="form-group">
        <label for="category">Categoria:</label>
        <select id="category" v-model="formData.categoryId" class="form-control">
          <option value="" disabled>Selecione uma categoria...</option>
          <option 
            v-for="category in categoryStore.categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="errors.categoryId" class="error">{{ errors.categoryId }}</p>
      </div>

      <div class="form-group">
        <label for="date">Data e Hora:</label>
        <input 
          type="datetime-local" 
          id="date" 
          v-model="formData.date" 
          class="form-control"
        />
        <p v-if="errors.date" class="error">{{ errors.date }}</p>
      </div>

      <div class="form-group">
        <label for="location">Local:</label>
        <input 
          type="text" 
          id="location" 
          v-model="formData.location" 
          class="form-control"
          placeholder="Ex: Teatro Municipal"
        />
        <p v-if="errors.location" class="error">{{ errors.location }}</p>
      </div>

      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          class="form-control" 
          rows="5"
          placeholder="Detalhes sobre o evento..."
        ></textarea>
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
      </div>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : buttonText }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { useCategoryStore } from '@/stores/category.store'

const props = defineProps<{
  initialData?: {
    title: string
    categoryId: string
    date: string
    location: string
    description: string
  }
  buttonText?: string
  isLoading?: boolean
}>()

const emit = defineEmits(['submit'])

const categoryStore = useCategoryStore()

const formData = reactive({
  title: '',
  categoryId: '',
  date: '',
  location: '',
  description: ''
})

const errors = reactive({
  title: '',
  categoryId: '',
  date: '',
  location: '',
  description: ''
})

onMounted(() => {
  categoryStore.fetchAllCategories()
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.title = newData.title
    formData.categoryId = newData.categoryId
    formData.location = newData.location
    formData.description = newData.description
    if (newData.date) {
        formData.date = newData.date.slice(0, 16)
    }
  }
}, { immediate: true })

function validate() {
  let isValid = true
  Object.keys(errors).forEach(key => (errors as any)[key] = '')

  if (!formData.title) {
    errors.title = 'Título é obrigatório'
    isValid = false
  }
  if (!formData.categoryId) {
    errors.categoryId = 'Categoria é obrigatória'
    isValid = false
  }
  if (!formData.date) {
    errors.date = 'Data é obrigatória'
    isValid = false
  }
  if (!formData.location) {
    errors.location = 'Local é obrigatório'
    isValid = false
  }
  if (!formData.description) {
    errors.description = 'Descrição é obrigatória'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (validate()) {
    emit('submit', { ...formData })
  }
}
</script>

<style scoped>
.form-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background-color: #4871fa;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #218838;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>