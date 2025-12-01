<template>
  <main class="container">
    <div v-if="eventStore.currentEvent" class="event-content">
      <h1>{{ eventStore.currentEvent.title }}</h1>
      <div class="event-info">
        <p><strong>Data:</strong> {{ eventStore.currentEvent.date }}</p>
      <p><strong>Local:</strong> {{ eventStore.currentEvent.location }}</p>
      </div>
      <hr />
      <p class="event-description">{{ eventStore.currentEvent.description }}</p>

      <RouterLink :to="{ name: 'home' }" class="back-link">&laquo; Voltar para a lista</RouterLink>
    </div>
    <div v-else class="loading">
      <h2>Evento não encontrado ou carregando...</h2>
      <RouterLink :to="{ name: 'home' }">&laquo; Voltar para a lista</RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import { useEventStore } from '@/stores/event.store'

const eventStore = useEventStore()

const route = useRoute()

onMounted(() => {
  
  const eventId = route.params.id as string 

  eventStore.fetchEventById(eventId)

})
</script>

<style scoped>

.container {
  max-width: 900px; 
  margin: 2rem auto; 
  padding: 1rem;
}

.event-content {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08); 
}

.event-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.event-info {
  display: flex;
  gap: 2rem; 
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

hr {
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
}

.event-description {
  font-size: 1.1rem; 
  line-height: 1.6; 
  color: #444;
  margin-bottom: 2rem;
}

.back-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 700;
}
.back-link:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 2rem;
}
</style>
