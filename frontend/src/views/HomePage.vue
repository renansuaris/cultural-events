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
  await eventStore.fetchAllEvents(selectedCategory.value)
  isLoading.value = false
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
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
</style>