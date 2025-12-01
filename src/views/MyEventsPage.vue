<template>
  <main class="container">
    <div class="page-header">
      <h1>Meus Eventos</h1>
      <p>Gerencie os eventos que você criou.</p>
    </div>

    <div v-if="eventStore.myEvents.length > 0" class="events-stack">
      <div 
        v-for="event in eventStore.myEvents" 
        :key="event.id" 
        class="event-row-card"
      >
        <div class="event-info">
          <h3>{{ event.title }}</h3>
          <div class="meta-info">
            <span>📅 {{ event.date }}</span>
            <span>📍 {{ event.location }}</span>
          </div>
        </div>
        
        <div class="event-actions">
          <RouterLink 
            :to="{ name: 'edit-event', params: { id: event.id } }" 
            class="btn-action edit"
          >
            Editar
          </RouterLink>
          
          <button 
            @click="handleDelete(event.id)" 
            class="btn-action delete"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <h3>Você ainda não criou nenhum evento.</h3>
      <br>
      <RouterLink :to="{ name: 'create-event' }" class="btn-primary">
        Criar Evento
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useEventStore } from '@/stores/event.store'

const eventStore = useEventStore()

onMounted(() => {
  eventStore.fetchMyEvents()
})

async function handleDelete(id: string) {
  if (confirm('Tem certeza que deseja deletar este evento?')) {
    
    const success = await eventStore.deleteEvent(id)
    
    if (!success) {
      alert('Ocorreu um erro ao tentar deletar o evento.')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
}

.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #666;
}

.events-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-row-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-row-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.event-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.meta-info {
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.event-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn-action.edit {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}
.btn-action.edit:hover {
  background-color: #e5e7eb;
}

.btn-action.delete {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.btn-action.delete:hover {
  background-color: #fecaca;
}

.empty-state {
  text-align: center;
  background: #fff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

</style>