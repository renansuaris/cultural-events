<template>
  <div class="event-card">
    <p class="card-category">{{ categoryName }}</p>

   <h3>{{ title }}</h3>
   <p><strong>Data:</strong> {{ date }}</p>
    <p><strong>Local:</strong> {{ location }}</p>
    <RouterLink class="details-link" :to="{ name: 'event-details', params: { id: id } }"> Ver Detalhes </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: string
  title: string
  date: string
  location: string
  categoryName: string
}>()
</script>

<style scoped>
.event-card {
 
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08); 
  
  padding: 1.5rem;
  margin-bottom: 0; 
  position: relative;
  
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.event-card h3 {
  font-size: 1.25rem;
  font-weight: 700; 
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.event-card p {
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.card-category {
  position: absolute;
  top: 1.5rem; 
  right: 1.5rem; 
  background-color: #007bff;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.details-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 700;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: inline-block; 
}

.details-link:hover {
  text-decoration: underline;
}
</style>
