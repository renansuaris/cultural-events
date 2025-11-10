<template>
  <main>
    <div v-if="eventStore.currentEvent">
      <h1>{{ eventStore.currentEvent.title }}</h1>
      <p><strong>Data:</strong> {{ eventStore.currentEvent.date }}</p>
      <p><strong>Local:</strong> {{ eventStore.currentEvent.location }}</p>
      <hr />
      <p>{{ eventStore.currentEvent.description }}</p>

      <RouterLink :to="{ name: 'home' }">&laquo; Voltar para a lista</RouterLink>
    </div>
    <div v-else>
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

main {
  max-width: 700px;
  margin: 0 auto;
}
hr {
  margin: 1.5rem 0;
}
</style>
