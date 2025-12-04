<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Minha Conta</h1>
      <p>Gerencie suas informações pessoais.</p>

      <div v-if="isLoading" class="loading">Carregando dados...</div>

      <form v-else @submit.prevent="handleUpdate">
        <div class="form-group">
          <label for="name">Nome Completo:</label>
          <input type="text" id="name" v-model="name" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>

        <hr class="divider" />
        
        <p class="hint">Deixe as senhas em branco se não quiser alterá-las.</p>

        <div class="form-group">
          <label for="password">Nova Senha:</label>
          <input type="password" id="password" v-model="password" placeholder="(Opcional)" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar Nova Senha:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="successMsg" class="success">{{ successMsg }}</p>

        <button type="submit" class="btn-submit">Salvar Alterações</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isLoading = ref(true)
const error = ref('')
const successMsg = ref('')

onMounted(async () => {
  const userId = authStore.userId
  if (!userId) return

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`)
    const user = await response.json()
    
    name.value = user.name
    email.value = user.email
  } catch (err) {
    error.value = 'Erro ao carregar perfil.'
  } finally {
    isLoading.value = false
  }
})

async function handleUpdate() {
  error.value = ''
  successMsg.value = ''

  if (!name.value || !email.value) {
    error.value = 'Nome e Email são obrigatórios.'
    return
  }

  const updateData: any = {
    name: name.value,
    email: email.value
  }

  if (password.value) {
    if (password.value !== confirmPassword.value) {
      error.value = 'As senhas não coincidem.'
      return
    }
    if (password.value.length < 6) {
      error.value = 'A senha deve ter pelo menos 6 caracteres.'
      return
    }
    updateData.password = password.value
  }

  const success = await authStore.updateProfile(authStore.userId!, updateData)

  if (success) {
    successMsg.value = 'Perfil atualizado com sucesso!'
    password.value = ''
    confirmPassword.value = ''
  } else {
    error.value = 'Erro ao atualizar perfil.'
  }
}
</script>

<style scoped>
.form-page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding: 2rem 1rem;
  background-color: #f9f9f9;
}

.form-container {
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
}

p {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #444;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 1.5rem 0;
}

.hint {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
  font-style: italic;
}

.error {
  color: #dc3545;
  font-size: 0.9rem;
  text-align: center;
}

.success {
  color: #28a745;
  font-size: 0.9rem;
  text-align: center;
  font-weight: bold;
}

.loading {
  text-align: center;
  color: #666;
}
</style>