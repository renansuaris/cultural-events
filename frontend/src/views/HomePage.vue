<template>
  <main>
    <h1>Próximos Eventos Culturais</h1>
    
    <div v-if="eventStore.events.length === 0" class="loading">
      <p>Sem Eventos</p>
    </div>

    <div v-else class="event-list">
      <EventCard
        v-for="event in eventStore.events"
        :key="event.id"
        :id="event.id" 
        :title="event.title"
        :date="event.date"
        :location="event.location"
        :categoryName="event.category?.name || 'Sem Categoria'"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { onMounted } from 'vue'
import { useEventStore } from '@/stores/event.store'

const eventStore = useEventStore()

onMounted(() => {
  eventStore.fetchAllEvents()
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
.loading {
  text-align: center;
  font-size: 2rem;
  color: #666;
}
</style>