<template>
  <main class="form-page-container">
    <div class="form-container">
      <h1>Crie sua Conta</h1>
      <p>Junte-se à comunidade e divulgue seus eventos!</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome Completo:</label>
          <input type="text" id="name" v-model="name" />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
          <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>
        <div class="form-group">
          <label for="password-confirm">Confirme sua Senha:</label>
          <input type="password" id="password-confirm" v-model="passwordConfirm" />
          <p v-if="errors.passwordConfirm" class="error">{{ errors.passwordConfirm }}</p>
        </div>

        <p v-if="errors.api" class="error">{{ errors.api }}</p>

        <button type="submit" class="btn-submit">Registrar</button>
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

import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router' 

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const errors = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  api: ''
})

const authStore = useAuthStore()
const router = useRouter()

function validateForm() {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.passwordConfirm = ''
  errors.api = ''
  
  let isValid = true
  if (!name.value) {
    errors.name = 'O nome é obrigatório.'
    isValid = false
  }
  if (!email.value) {
    errors.email = 'O email é obrigatório.'
    isValid = false
  }
  if (password.value.length < 6) { 
    errors.password = 'A senha deve ter pelo menos 6 caracteres.'
    isValid = false
  }
  if (password.value !== passwordConfirm.value) {
    errors.passwordConfirm = 'As senhas não coincidem.'
    isValid = false
  }
  return isValid
}

async function handleSubmit() {
  if (!validateForm()) {
    return 
  }
  const result = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value
  })
  if (result.success) {
    router.push({ name: 'home' })
  } else {
    errors.api = result.error || 'Ocorreu um erro desconhecido.'
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

.login-link {
  margin-top: 1.5rem;
}
.login-link p {
  font-size: 0.9rem;
}
.login-link a {
  color: #007bff;
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