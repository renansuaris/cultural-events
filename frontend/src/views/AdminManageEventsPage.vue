<template>
  <main class="container">
    <div class="header-flex">
      <div>
        <h1>Gerenciar Eventos</h1>
      </div>
      <RouterLink :to="{ name: 'admin-dashboard' }" class="back-link">
        Voltar ao Painel</RouterLink>
    </div>

    <div v-if="isLoading" class="loading-state">
      Carregando eventos...
    </div>

    <div v-else-if="eventStore.events.length > 0" class="table-card">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Data</th>
              <th>Categoria</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in eventStore.events" :key="event.id">
              <td>
                <div class="event-cell">
                  <strong>{{ event.title }}</strong>
                  <small class="location-text">
                    <font-awesome-icon icon="map-marker-alt" /> {{ event.location }}
                  </small>
                </div>
              </td>
              <td class="date-cell">
                {{ formatDate(event.date) }}
              </td>
              <td>
                <span class="badge">{{ event.category?.name || 'Sem Categoria' }}</span>
              </td>
              <td class="actions-cell">
                <RouterLink 
                  :to="{ name: 'edit-event', params: { id: event.id } }" 
                  class="btn-action edit"
                  title="Editar"
                >
                  <font-awesome-icon icon="pen-to-square" />
                </RouterLink>
                
                <button 
                  @click="handleDelete(event.id)" 
                  class="btn-action delete"
                  title="Excluir"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>Nenhum evento encontrado no sistema.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/formatDate'

const eventStore = useEventStore()
const isLoading = ref(true)

onMounted(async () => {
  await eventStore.fetchAllEvents()
  isLoading.value = false
})

async function handleDelete(id: string) {
  if (confirm('Admin: Tem certeza que deseja excluir este evento permanentemente?')) {
    const success = await eventStore.deleteEvent(id)
    if (!success) {
      alert('Erro ao excluir evento.')
    } else {
      await eventStore.fetchAllEvents()
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.back-link {
  color: #666;
  text-decoration: none;
}
.back-link:hover { text-decoration: underline; }

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  overflow: hidden; 
}

.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.admin-table th {
  background-color: #f9fafb;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.admin-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
  color: #374151;
}

.admin-table tr:last-child td {
  border-bottom: none;
}

.admin-table tr:hover {
  background-color: #f9fafb; 
}

.event-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.location-text {
  color: #9ca3af;
  font-size: 0.85rem;
}

.date-cell {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: #4b5563;
}

.badge {
  background-color: #eff6ff;
  color: #2563eb;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #dbeafe;
}

.actions-cell {
  text-align: right;
  white-space: nowrap;
}
.text-right { text-align: right; }

.btn-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0.5rem;
  font-size: 0.9rem;
  text-decoration: none;
}

.btn-action.edit {
  background-color: #f3f4f6;
  color: #4b5563;
  border-color: #e5e7eb;
}
.btn-action.edit:hover {
  background-color: #e5e7eb;
  color: #111827;
  border-color: #d1d5db;
}

.btn-action.delete {
  background-color: #fef2f2;
  color: #dc2626;
  border-color: #fee2e2;
}
.btn-action.delete:hover {
  background-color: #fee2e2;
  border-color: #fecaca;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>