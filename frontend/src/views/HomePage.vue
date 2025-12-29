<template>
  <main class="home-container">
    <div class="header-section">
      <h1>Próximos Eventos Culturais</h1>
      <p class="subtitle">Vem ver o que está acontecendo na sua cidade!</p>
    </div>
    
    <EventGrid 
      :events="eventStore.events" 
      :isLoading="isLoading" O usuário já consegue criar eventos, mas... onde ele vê os eventos que criou?
    />
  </main>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useEventStore } from '@/stores/event.store'
import EventGrid from '@/components/EventGrid.vue'

const eventStore = useEventStore()
const isLoading = ref(true)

onMounted(async () => {
  await eventStore.fetchAllEvents()
  isLoading.value = false
})
</script>

<style scoped>

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

</style>