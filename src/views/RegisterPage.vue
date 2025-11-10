<template>
  <main>
    <h1>Crie sua Conta</h1>
    <p>Junte-se à comunidade e comece a divulgar seus eventos!</p>

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

      <button type="submit">Registrar</button>
    </form>
  </main>
</template>

<script setup lang="ts">

import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

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

.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.25rem;
}
input[type='text'],
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

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>