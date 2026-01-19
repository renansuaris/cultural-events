<template>
  <footer class="simple-footer">
    <div class="content">
      <div class="footer-flex">
        <p>&copy; Cultural Events</p>
        
        <div class="footer-links">
          <RouterLink :to="{ name: 'about' }">Sobre</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  
import { RouterLink } from 'vue-router'

</script>

<style scoped>
.simple-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  color: #6c757d;
  text-align: center; 
  padding: 1.5rem 0;
  margin-top: auto;
  font-size: 0.9rem;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; 
  gap: 0.5rem; 
}

.content p {
  margin: 0;
}

.footer-links a {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary);
  text-decoration: underline;
}
</style>