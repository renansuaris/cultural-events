<template>
  <main class="container">
    <div class="header-flex">
      <h1>Gerenciar Usuários</h1>
      <RouterLink :to="{ name: Routes.ADMIN_DASHBOARD }" class="back-link">&laquo; Voltar ao Painel</RouterLink>
    </div>

    <div v-if="authStore.usersList.length > 0" class="table-card">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Papel (Role)</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in authStore.usersList" :key="user.id">
              <td>
                <strong>{{ user.name }}</strong>
              </td>
              <td class="email-cell">{{ user.email }}</td>
              <td>
                <span :class="['role-badge', user.role === 'admin' ? 'admin' : 'user']">
                  {{ user.role === 'admin' ? 'Administrador' : 'Usuário' }}
                </span>
              </td>
              <td class="actions-cell">
                <button 
                  v-if="user.id !== authStore.userId" 
                  @click="toggleRole(user)" 
                  class="btn-action edit"
                  title="Alterar Papel"
                >
                  <font-awesome-icon icon="pen-to-square" />
                </button>

                <button 
                  v-if="user.id !== authStore.userId"
                  @click="handleDelete(user.id)" 
                  class="btn-action delete"
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
    </div>
    
    <div v-else class="empty-state">
      <p>Carregando usuários...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Routes } from '@/constants/routeNames'

const authStore = useAuthStore()
const toast = useToast()

onMounted(() => {
  authStore.fetchAllUsers()
})

async function handleDelete(id: string) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      await authStore.deleteUser(id)
      toast.success('Usuário removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao excluir usuário.')
    }
  }
}

async function toggleRole(user: User) {
  const newRole = user.role === 'admin' ? 'user' : 'admin'
  if (confirm(`Deseja alterar o papel de ${user.name} para "${newRole}"?`)) {
    try {
      await authStore.updateUserRole(user.id, newRole)
      toast.success(`Papel alterado para ${newRole}`)
    } catch (error) {
      toast.error("Erro ao alterar permissões.")
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
.back-link { color: #666; text-decoration: none; }
.back-link:hover { text-decoration: underline; }

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  overflow: hidden; 
}
.table-responsive { overflow-x: auto; }

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
.admin-table tr:last-child td { border-bottom: none; }
.admin-table tr:hover { background-color: #f9fafb; }

.email-cell { color: #666; }

.role-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}
.role-badge.admin {
  background-color: #eff6ff;
  color: var(--primary);
  border-color: #dbeafe;
}
.role-badge.user {
  background-color: #f3f4f6;
  color: #374151;
  border-color: #e5e7eb;
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

.current-user-tag {
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
  padding-right: 10px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
}
</style>