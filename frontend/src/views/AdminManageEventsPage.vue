<template>
  <main class="container">
    <div class="header-flex">
      <h1>Gerenciar Eventos</h1>
      <RouterLink :to="{ name: 'admin-dashboard' }" class="back-link">&laquo; Voltar ao Painel</RouterLink>
    </div>

    <div v-if="isLoading">Carregando eventos...</div>

    <div v-else-if="eventStore.events.length > 0" class="table-responsive">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Evento</th>
            <th>Data</th>
            <th>Categoria</th> <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in eventStore.events" :key="event.id">
            <td>#{{ event.id }}</td>
            <td>
              <strong>{{ event.title }}</strong><br>
              <small>{{ event.location }}</small>
            </td>
            <td>{{ event.date }}</td>
            <td>
              <span class="badge">{{ event.category?.name || 'Sem Categoria' }}</span>
            </td>
            <td class="actions-cell">
              <RouterLink :to="{ name: 'edit-event', params: { id: event.id } }" class="btn-icon edit">
                Editar
              </RouterLink>
              <button @click="handleDelete(event.id)" class="btn-icon delete">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>Nenhum evento encontrado no sistema.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { RouterLink } from 'vue-router'

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

.back-link {
  color: #666;
  text-decoration: none;
}
.back-link:hover { text-decoration: underline; }

.table-responsive {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.admin-table th, .admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.admin-table th {
  background-color: #f8f9fa;
  font-weight: 700;
  color: #444;
}

.admin-table tr:last-child td { border-bottom: none; }

.badge {
  background-color: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
}

.btn-icon.edit {
  background-color: #ffc107;
  color: #212529;
}

.btn-icon.delete {
  background-color: #dc3545;
  color: white;
}
</style>