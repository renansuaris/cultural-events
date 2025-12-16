<template>
  <main class="container">
    <div class="header-flex">
      <h1>Gerenciar Usuários</h1>
      <RouterLink :to="{ name: 'admin-dashboard' }" class="back-link">&laquo; Voltar ao Painel</RouterLink>
    </div>

    <div v-if="authStore.usersList.length > 0" class="table-responsive">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel (Role)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in authStore.usersList" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['role-badge', user.role === 'admin' ? 'admin' : 'user']">
                {{ user.role }}
              </span>
            </td>
            <td class="actions-cell">
              <button 
                v-if="user.id !== authStore.userId" 
                @click="toggleRole(user)" 
                class="btn-icon edit"
                title="Alterar Papel"
              >
                <font-awesome-icon icon="pen-to-square" /> Trocar Papel
              </button>

              <button 
                v-if="user.id !== authStore.userId"
                @click="handleDelete(user.id)" 
                class="btn-icon delete"
                title="Excluir Usuário"
              >
                <font-awesome-icon icon="trash" />
              </button>
              <span v-else class="current-user-tag">(Você)</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Carregando usuários...</p>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore, type IUser } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchAllUsers()
})

async function handleDelete(id: string) {
  if (confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível.')) {
    await authStore.deleteUser(id)
  }
}

async function toggleRole(user: IUser) {
  const newRole = user.role === 'admin' ? 'user' : 'admin'
  
  if (confirm(`Deseja alterar o papel de ${user.name} para "${newRole}"?`)) {
    await authStore.updateUserRole(user.id, newRole)
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
.back-link { color: #666; text-decoration: none; }
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

.role-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
}
.role-badge.admin {
  background-color: #e0e7ff; 
  color: #3730a3;
}
.role-badge.user {
  background-color: #ecfccb; 
  color: #365314;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.btn-icon {
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-icon.edit {
  background-color: #f3f4f6;
  color: #333;
  border: 1px solid #ddd;
}
.btn-icon.delete {
  background-color: #fee2e2;
  color: #b91c1c;
}
.current-user-tag {
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
}
</style>