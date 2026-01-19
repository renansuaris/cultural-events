<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Minha Conta</h1>
      <p>Gerencie suas informações pessoais.</p>

      <div v-if="isLoading" class="loading">Carregando dados...</div>

      <form v-else @submit.prevent="handleUpdate">
        <div class="form-group">
          <label for="name">Nome Completo:</label>
          <input
           type="text" 
           id="name" 
           v-model="name" 
           :class="{ 'is-invalid': errors.name }"
           />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            :class="{ 'is-invalid': errors.email }"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <hr class="divider" />
        
        <p class="hint">Deixe as senhas em branco se não quiser alterá-las.</p>

        <div class="form-group">
          <label for="password">Nova Senha:</label>
          <input type="password" 
            id="password"
            v-model="password" 
            placeholder="(Opcional)" 
            :class="{ 'is-invalid': errors.password }"
            />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar Nova Senha:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" :class="{ 'is-invalid': errors.confirmPassword }" />
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
import AuthService from '@/services/AuthService'
import { useFormHandler } from '@/composables/useFormHandler'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const { isLoading, errors, execute } = useFormHandler()

onMounted(async () => {
  try {
    const user = await AuthService.getProfile()
    name.value = user.name
    email.value = user.email
  } catch (err) {
      toast.error('Erro ao carregar perfil.')
    } 
})

async function handleUpdate() {
  if (password.value) {
    if (password.value !== confirmPassword.value) {
      toast.warning('As senhas não coincidem.')
      return
    }
    if (password.value.length < 6) {
      toast.warning('A senha deve ter pelo menos 6 caracteres.')
      return
    }
  }

  const updateData: any = {
    name: name.value,
    email: email.value
  }
  if (password.value) {
    updateData.password = password.value
  }

  await execute(
    () => authStore.updateProfile(authStore.userId!, updateData),
    () => {
      toast.success('Perfil atualizado com sucesso!')
      password.value = ''
      confirmPassword.value = ''
    }
  )
}
</script>

<style scoped>
  
.is-invalid {
  border-color: #dc3545 !important;
  background-color: #fff8f8;
}
.error-msg {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

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
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 0.85rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: var(--primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: var(--primary-hover);
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