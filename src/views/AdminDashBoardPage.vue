<template>
  <main>
    <h1>Página de Admin Dashboard</h1>
    <p>Selecione uma área para gerenciar:</p>

    <nav class="admin-nav">
      <ul>
        <li>
          <RouterLink :to="{ name: 'admin-events' }">
            Gerenciar Eventos
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'admin-users' }">
            Gerenciar Usuários
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'admin-categories' }">
            Gerenciar Categorias
          </RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.admin-nav ul {
  list-style: none;
  padding: 0;
}
.admin-nav li {
  margin-bottom: 1rem;
}
.admin-nav a {
  display: block;
  padding: 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.admin-nav a:hover {
  background-color: #e9e9e9;
}
</style>