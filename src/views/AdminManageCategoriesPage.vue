<template>
  <main>
    <h1>Admin: Gerenciar Categorias</h1>

    <form @submit.prevent="handleCreate" class="category-form">
      <div class="form-group">
        <label for="new-category">Nova Categoria:</label>
        <input 
          type="text" 
          id="new-category"
          v-model="newCategoryName" 
          placeholder="Ex: Música"
        />
        <button type="submit">Adicionar</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <hr />

    <h2>Categorias Atuais</h2>
    <div v-if="categoryStore.categories.length > 0" class="category-list">
      <ul>
        <li v-for="category in categoryStore.categories" :key="category.id">
          <span>{{ category.name }}</span>
          
          <button 
            @click="handleDelete(category.id)" 
            class="btn-delete"
          >
            Deletar
          </button>
        </li>
      </ul>
    </div>
    <p v-else>Nenhuma categoria encontrada.</p>
  </main>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category.store' 

const categoryStore = useCategoryStore()

const newCategoryName = ref('')
const error = ref('')

onMounted(() => {
  categoryStore.fetchAllCategories()
})

async function handleCreate() {

  if (newCategoryName.value.trim() === '') {
    error.value = 'O nome da categoria não pode estar vazio.'
    return
  }
  
  error.value = '' 
  
  const success = await categoryStore.createCategory(newCategoryName.value)
  
  if (success) {
    newCategoryName.value = '' 
  } else {
    error.value = 'Erro ao tentar criar a categoria.'
  }
}

async function handleDelete(id: string) {
  if (confirm('Tem certeza que deseja deletar esta categoria?')) {
    const success = await categoryStore.deleteCategory(id)
    if (!success) {
      alert('Erro ao tentar deletar a categoria.')
    }
  }
}
</script>

<style scoped>

.category-form .form-group {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}
.category-form label {
  display: block;
  margin-bottom: 5px;
}
.category-form input {
  padding: 8px;
  font-size: 1rem;
}
.category-form button {
  padding: 8px 12px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.category-list ul {
  list-style: none;
  padding: 0;
  max-width: 500px;
}
.category-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 8px;
}
.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
hr {
  margin: 2rem 0;
}
</style>