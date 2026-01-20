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
          :class="{ 'is-invalid': serverErrors?.title }"
          placeholder="Ex: Show de Rock na praca do leão"
        />
        <span v-if="serverErrors?.title" class="error">{{ serverErrors.title }}</span>
      </div>

      <div class="form-group">
        <label for="category">Categoria:</label>
        <select id="category"
         v-model="formData.categoryId" 
         class="form-control"
         :class="{ 'is-invalid': serverErrors?.categoryId }">
          <option value="" disabled>Selecione uma categoria...</option>
          <option 
            v-for="category in categoryStore.categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <span v-if="serverErrors?.categoryId" class="error">{{ serverErrors.categoryId }}</span>
      </div>

      <div class="form-group">
        <label for="date">Data e Hora:</label>
        <input 
          type="datetime-local" 
          id="date" 
          v-model="formData.date" 
          class="form-control"
          :class="{ 'is-invalid': serverErrors?.date }"
        />
        <span v-if="serverErrors?.date" class="error">{{ serverErrors.date }}</span>
      </div>

      <div class="form-group">
        <label for="location">Local:</label>
        <input 
          type="text" 
          id="location" 
          v-model="formData.location" 
          class="form-control"
          :class="{ 'is-invalid': serverErrors?.location }"
          placeholder="Ex: Teatro Municipal"
        />
        <span v-if="serverErrors?.location" class="error">{{ serverErrors.location }}</span>
      </div>

      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          class="form-control" 
          :class="{ 'is-invalid': serverErrors?.description }"
          rows="5"
          placeholder="Detalhes sobre o evento..."
        ></textarea>
        <span v-if="serverErrors?.description" class="error">{{ serverErrors.description }}</span>
      </div>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : buttonText }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useCategoryStore } from '@/stores/category.store'
import { toInputDate } from '@/utils/formatDate';

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
  serverErrors?: Record<string, string>
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
        formData.date = toInputDate(newData.date)
    }
  }
}, { immediate: true })

function handleSubmit() {
  emit('submit', { ...formData })
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
  border-color: var(--primary-light);
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
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: var(--primary-hover);
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>