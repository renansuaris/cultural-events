<template>
  <main class="home-container">
    
    <div class="page-header">
      <div class="text-content">
        <h1>Próximos Eventos</h1>
        <p class="subtitle">Descubra o que está rolando</p>
      </div>

      <div class="filter-group">
        <label for="category-filter">Categoria:</label>
        <select 
          id="category-filter" 
          v-model="selectedCategory" 
          @change="handleFilterChange"
          class="filter-select"
        >
          <option value="">Todas</option>
          <option v-for="cat in categoryStore.categories" :value="cat.id" :key="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <EventGrid :events="eventStore.events" :isLoading="isLoading" />

    <div v-if="eventStore.totalPages > 1" class="pagination-controls">
      <button 
        :disabled="eventStore.page === 1" 
        @click="changePage(eventStore.page - 1)"
        class="btn-page icon-only"
        title="Página Anterior"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>

      <span class="page-info">
        Página {{ eventStore.page }} de {{ eventStore.totalPages }}
      </span>

      <button 
        :disabled="eventStore.page === eventStore.totalPages" 
        @click="changePage(eventStore.page + 1)"
        class="btn-page icon-only"
        title="Próxima Página"
      >
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { useCategoryStore } from '@/stores/category.store' 
import EventGrid from '@/components/EventGrid.vue'

const eventStore = useEventStore()
const categoryStore = useCategoryStore() 

const isLoading = ref(true)
const selectedCategory = ref('') 

onMounted(async () => {
  await Promise.all([
    eventStore.fetchAllEvents(),
    categoryStore.fetchAllCategories()
  ])
  isLoading.value = false
})

async function handleFilterChange() {
  isLoading.value = true
  await eventStore.fetchAllEvents(selectedCategory.value, 1)
  isLoading.value = false
}

async function changePage(newPage: number) {
  isLoading.value = true
  await eventStore.fetchAllEvents(selectedCategory.value, newPage)
  window.scrollTo({ top: 0 })
  isLoading.value = false
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: end; 
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee; 
  padding-bottom: 1.5rem;
  flex-wrap: wrap; 
  gap: 1rem;
}

h1 {
  color: #2c3e50;
  margin: 0 0 0.2rem 0;
  font-size: 1.8rem;
}

.subtitle {
  color: #666;
  margin: 0;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  min-width: 180px;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.btn-page {
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #555;
  transition: 0.2s;
}

.btn-page:hover:not(:disabled) {
  border-color: var(--primary-light);
  color: var(--primary);
  background-color: #f0f7ff;
}

.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f9f9f9;
}

.page-info {
  font-weight: bold;
  color: #444;
}
</style>