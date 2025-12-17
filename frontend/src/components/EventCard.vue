<template>
  <div class="event-card">
    <div class="card-header">
      <span class="category-badge">{{ categoryName }}</span>
    </div>

    <div class="card-content">
      <h3 class="card-title" :title="title">{{ title }}</h3>
      
      <div class="card-info">
        <p>
          <font-awesome-icon icon="calendar-days" class="icon" /> 
          {{ date }}
        </p>
        <p>
          <font-awesome-icon icon="map-marker-alt" class="icon" /> 
          {{ location }}
        </p>
      </div>

      <div class="card-footer">
        <RouterLink class="btn-details" :to="{ name: 'event-details', params: { id: id } }">
          Ver Detalhes
        </RouterLink>
      </div>
    </div>
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
  border: 1px solid #e0e0e0; 
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%; 
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  border-color: #007bff;
}

.card-header {
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
}

.category-badge {
  background-color: #e3f2fd; 
  color: #007bff; 
  padding: 0.35rem 0.75rem;
  border-radius: 50px; 
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.card-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info {
  margin-bottom: 1.5rem;
}

.card-info p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  color: #999;
  width: 16px;
}

.card-footer {
  margin-top: auto; 
  padding-right: 1.5rem;
}

.btn-details {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #f8f9fa;
  color: #333;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-details:hover {
  background-color: #007bff;
  color: white;
}
</style>