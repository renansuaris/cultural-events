<template>
  <div class="event-grid-container">
    
    <div v-if="isLoading" class="loading-state">
      <p>Carregando eventos...</p>
    </div>

    <div v-else-if="events.length > 0" class="grid">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :id="event.id" 
        :title="event.title"
        :date="event.date"
        :location="event.location"
        :categoryName="event.category?.name || 'Sem Categoria'"
      />
    </div>

    <div v-else class="empty-state">
      <font-awesome-icon icon="circle-exclamation" class="empty-icon" />
      <p>Nenhum evento encontrado.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { IEvent } from '@/stores/event.store'

defineProps<{
  events: IEvent[]
  isLoading?: boolean
}>()
</script>

<style scoped>
.event-grid-container {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin-top: 1rem;
}

.empty-icon {
  font-size: 2rem;
  color: #999;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>