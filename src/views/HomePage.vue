<template>
  <main>
    <h1>Próximos Eventos Culturais</h1>
    <div class="event-list">
      <EventCard
        v-for="event in eventStore.events"
        :key="event.id"
        :id="event.id" 
        :title="event.title"
        :date="event.date"
        :location="event.location"
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