<template>
  <main>
    <h1>Meus Eventos</h1>
    <p>Aqui você pode gerenciar os eventos que você criou.</p>

    <div v-if="eventStore.myEvents.length > 0" class="my-events-list">
      <ul>
        <li v-for="event in eventStore.myEvents" :key="event.id">
          <div class="event-info">
            <strong>{{ event.title }}</strong>
            <small>{{ event.date }} - {{ event.location }}</small>
          </div>
          
          <div class="event-actions">
            <RouterLink 
              :to="{ name: 'edit-event', params: { id: event.id } }" 
              class="btn-edit"
            >
              Editar
            </RouterLink>
            
            <button 
              @click="handleDelete(event.id)" 
              class="btn-delete"
            >
              Deletar
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Você ainda não criou nenhum evento.</p>
      <RouterLink :to="{ name: 'create-event' }">Criar meu primeiro evento</RouterLink>
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
.my-events-list ul {
  list-style: none;
  padding: 0;
}
.my-events-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.event-info {
  display: flex;
  flex-direction: column;
}
.event-info strong {
  font-size: 1.2rem;
}
.event-info small {
  color: #555;
}
.event-actions a,
.event-actions button {
  text-decoration: none;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 8px;
}
.btn-edit {
  background-color: #ffc107;
  color: #333;
}
.btn-delete {
  background-color: #dc3545;
  color: white;
}
</style>