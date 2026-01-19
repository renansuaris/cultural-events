<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Crie sua Conta</h1>
      <p>Junte-se à comunidade e divulgue seus eventos!</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome Completo:</label>
          <input type="text" id="name" v-model="name" :class="{ 'is-invalid': errors.name }" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" :class="{ 'is-invalid': errors.email }" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" :class="{ 'is-invalid': errors.password }"/>
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>
        <div class="form-group">
          <label for="password-confirm">Confirme sua Senha:</label>
          <input type="password" id="password-confirm" v-model="passwordConfirm" :class="{ 'is-invalid': errors.password }" />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Registrando...' : 'Registrar' }}
        </button>
      </form>

      <div class="login-link">
        <p>
          Já tem uma conta?
          <RouterLink :to="{ name: 'login' }">Faça login</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { useRouter, RouterLink } from 'vue-router' 
import { useFormHandler } from '@/composables/useFormHandler'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const { isLoading, errors, execute } = useFormHandler()
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

async function handleSubmit() {
  if (password.value !== passwordConfirm.value) {
    toast.warning("As senhas não coincidem!");
    return;
  }
  
  await execute(
    () => authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    }),
    () => {
      toast.success('Conta criada! Faça login.')
      router.push({ name: 'login' })
    }
  )
}
</script>

<style scoped>

.is-invalid {
   border-color: #dc3545 !important; 
  }

.form-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; 
  padding: 2rem 1rem;
}

.form-container {
  width: 100%;
  max-width: 450px; 
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
}

p {
  text-align: center;
  color: #555;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #444;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: var(--primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: var(--primary-hover);
}

.login-link {
  margin-top: 1.5rem;
}
.login-link p {
  font-size: 0.9rem;
}
.login-link a {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}
.login-link a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  
}
</style>