<template>
  <div class="event-card">
    <h3>{{ title }}</h3>
    <p><strong>Data:</strong> {{ date }}</p>
    <p><strong>Local:</strong> {{ location }}</p>
    <RouterLink :to="{ name: 'event-details', params: { id: id } }"> Ver Detalhes </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: string
  title: string
  date: string
  location: string
}>()
</script>

<style scoped>
.event-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
