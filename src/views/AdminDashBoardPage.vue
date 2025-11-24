<template>
  <main class="container">
    <h1>Painel do Administrador</h1>
    <p class="subtitle">Bem vindo, Admin. Selecione uma área para gerenciar:</p>

    <div class="dashboard-grid">
      <RouterLink :to="{ name: 'admin-events' }" class="dashboard-card">
        <div class="card-icon">📅</div>
        <h3>Gerenciar Eventos</h3>
        <p>Visualize, edite ou remova qualquer evento da plataforma.</p>
      </RouterLink>

      <RouterLink :to="{ name: 'admin-users' }" class="dashboard-card">
        <div class="card-icon">👥</div>
        <h3>Gerenciar Usuários</h3>
        <p>Veja os usuários cadastrados e gerencie permissões.</p>
      </RouterLink>

      <RouterLink :to="{ name: 'admin-categories' }" class="dashboard-card">
        <div class="card-icon">🏷️</div>
        <h3>Gerenciar Categorias</h3>
        <p>Crie ou remova categorias para os eventos.</p>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  border-color: #007bff;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.dashboard-card h3 {
  margin: 0 0 0.5rem 0;
  color: #007bff;
}

.dashboard-card p {
  margin: 0;
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;
}
</style>