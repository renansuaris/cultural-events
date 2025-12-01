<template>
  <main class="container">
    <div class="header-flex">
      <h1>Gerenciar Categorias</h1>
      <RouterLink :to="{ name: 'admin-dashboard' }" class="back-link">&laquo; Voltar ao Painel</RouterLink>
    </div>

    <div class="content-card">
      <div class="form-section">
        <h3>Nova Categoria</h3>
        <form @submit.prevent="handleCreate" class="add-form">
          <input 
            type="text" 
            v-model="newCategoryName" 
            placeholder="Ex: Música, Teatro, Workshop..."
            class="form-input"
          />
          <button type="submit" class="btn-add">
            + Adicionar
          </button>
        </form>
        <p v-if="error" class="error-msg">{{ error }}</p>
      </div>

      <hr class="divider" />

      <h3>Categorias Atuais</h3>
      
      <div v-if="categoryStore.categories.length > 0" class="category-list-container">
        <ul class="category-list">
          <li v-for="category in categoryStore.categories" :key="category.id" class="category-item">
            <span class="category-name">{{ category.name }}</span>
            
            <button 
              @click="handleDelete(category.id)" 
              class="btn-icon delete"
              title="Excluir Categoria"
            >
              Excluir
            </button>
          </li>
        </ul>
      </div>
      
      <p v-else class="empty-msg">Nenhuma categoria encontrada.</p>
    </div>
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

.container {
  max-width: 800px; 
  margin: 2rem auto;
  padding: 1rem;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.back-link {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}
.back-link:hover { text-decoration: underline; }

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

h3 {
  margin-top: 0;
  color: #444;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.form-section {
  margin-bottom: 1.5rem;
}

.add-form {
  display: flex;
  gap: 10px;
}

.form-input {
  flex: 1; 
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-add {
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}
.btn-add:hover { background-color: #0056b3; }

.error-msg { color: #dc3545; font-size: 0.9rem; margin-top: 0.5rem; }

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 2rem 0;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #eee;
  border-radius: 6px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-bottom: 1px solid #eee;
  transition: 0.1s;
}

.category-item:last-child { border-bottom: none; }
.category-item:hover { background-color: #f9f9f9; }

.category-name {
  font-weight: 500;
  color: #333;
}

.btn-icon.delete {
  background-color: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: bold;
}
.btn-icon.delete:hover { background-color: #fecaca; }

.empty-msg { color: #666; font-style: italic; }
</style>