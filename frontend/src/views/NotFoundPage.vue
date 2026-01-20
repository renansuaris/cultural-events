<template>
  <main class="not-found">
    <h1>404</h1>
    <p>Página não encontrada.</p>

    <RouterLink :to="{ name: Routes.HOME }" class="link">
      Voltar para a página inicial
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Routes } from '@/constants/routeNames';
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1.5rem;
  color: #555;
}

.link {
  color: #2c3e50;
  text-decoration: underline;
  font-weight: 500;
}
</style>
