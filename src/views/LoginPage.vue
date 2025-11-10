<template>
  <main>
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

      <button type="submit">Entrar</button>
    </form>

    <div class="register-link">
      <p>
        Não tem cadastro ainda?
        <RouterLink :to="{ name: 'register' }">Cadastre-se</RouterLink>
      </p>
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
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
}
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
.register-link {
  margin-top: 2rem;
}
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>