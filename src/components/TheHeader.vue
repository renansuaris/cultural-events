<template>
  <header class="main-header">
    <div class="container">
      <RouterLink :to="{ name: 'home' }" class="logo">
        Cultural Events
      </RouterLink>

      <nav class="main-nav">
        <RouterLink :to="{ name: 'home' }">Eventos</RouterLink>

        <span v-if="auth.isLoggedIn">
          <RouterLink :to="{ name: 'create-event' }">Criar Evento</RouterLink>
          <RouterLink v-if="!auth.isAdmin" :to="{ name: 'my-events' }">
            Meus Eventos
          </RouterLink>
          <RouterLink :to="{ name: 'profile' }">Minha Conta</RouterLink>
          <RouterLink v-if="auth.isAdmin" :to="{ name: 'admin-dashboard' }">
            Admin
          </RouterLink>
          <a @click="handleLogout" href="#">Logout</a>
        </span>
        <span v-else>
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </span>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
/* O header principal (continua o mesmo) */
.main-header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  box-sizing: border-box;
}

/* O container (continua o mesmo) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem; 
}

.main-nav span {
  display: flex;
  align-items: center;
  gap: 1.5rem; 
}

.main-nav a {
  text-decoration: none;
  color: #555;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
}
.main-nav a:hover {
  color: #007bff;
}
.main-nav a[href="#"] {
  color: #dc3545;
}
</style>