<template>
  <main>
    <h1>Próximos Eventos Culturais</h1>
    <div class="event-list">
      <EventCard
        v-for="event in joinedEvents"
        :key="event.id"
        :id="event.id" 
        :title="event.title"
        :date="event.date"
        :location="event.location"
                :categoryName="event.categoryName"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { useCategoryStore } from '@/stores/category.store'
import { onMounted, computed } from 'vue'
import { useEventStore } from '@/stores/event.store'

const eventStore = useEventStore()
const categoryStore = useCategoryStore()

onMounted(() => {

  eventStore.fetchAllEvents()
  categoryStore.fetchAllCategories()
})

const joinedEvents = computed(() => {

  const events = eventStore.events

  const categories = categoryStore.categories
  if (categories.length === 0) {
    return events.map(event => ({
      ...event,
      categoryName: 'Carregando...'
    }))
  }

  return events.map(event => {
    const category = categories.find(c => c.id === event.categoryId)
    
    return {
      ...event, 
      categoryName: category?.name || 'Sem Categoria'
    }
  })
})
</script>

<style scoped>

.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>