<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Página de Login</h1>
      <p>Acesse sua conta para continuar.</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <p v-if="apiError" class="error">{{ apiError }}</p>

        <button type="submit" class="btn-submit">Entrar</button>
      </form>

      <div class="register-link">
        <p>
          Não tem cadastro ainda?
          <RouterLink :to="{ name: 'register' }">Cadastre-se</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const apiError = ref('') 

const authStore = useAuthStore()
const router = useRouter()

async function handleSubmit() {
  apiError.value = ''
  if (!email.value || !password.value) {
    apiError.value = 'Por favor, preencha email e senha.'
    return
  }
  const result = await authStore.login({
    email: email.value,
    password: password.value
  })
  if (result.success) {
    if (result.role === 'admin') {
      router.push({ name: 'admin-dashboard' })
    } else {
      router.push({ name: 'home' })
    }
  } else {
    apiError.value = result.error || 'Ocorreu um erro desconhecido.'
  }
}
</script>

<style scoped>

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
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 1.5rem;
}
.register-link p {
  font-size: 0.9rem;
}
.register-link a {
  color: #007bff;
  font-weight: 700;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>