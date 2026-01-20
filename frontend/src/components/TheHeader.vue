<template>
  <header class="main-header">
    <div class="container">
      <RouterLink :to="{ name: Routes.HOME }" class="logo">
        Cultural <span class="color">Events</span>
      </RouterLink>

      <nav class="main-nav">
        <RouterLink :to="{ name: Routes.HOME }">Eventos</RouterLink>

        <span v-if="auth.isLoggedIn">
          <RouterLink :to="{ name: Routes.CREATE_EVENT }">Criar Evento</RouterLink>
          <RouterLink v-if="!auth.isAdmin" :to="{ name: Routes.MY_EVENTS }">
            Meus Eventos
          </RouterLink>
          <RouterLink :to="{ name: Routes.PROFILE }">Minha Conta</RouterLink>
          <RouterLink v-if="auth.isAdmin" :to="{ name: Routes.ADMIN_DASHBOARD }">
            Admin
          </RouterLink>
          <a @click="handleLogout" href="#">Logout <font-awesome-icon icon="right-from-bracket" /></a>
        </span>
        <span v-else>
          <RouterLink :to="{ name: Routes.LOGIN }">Login</RouterLink>
        </span>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Routes } from '@/constants/routeNames'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.main-header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  box-sizing: border-box;
}

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

.color {
  color: var(--primary); 
}

.main-nav a {
  text-decoration: none;
  color: #555;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: var(--primary); 
}
.main-nav a[href="#"] {
  color: #dc3545;
}
</style>