<template>
  <footer class="simple-footer">
    <div class="content">
      <p>&copy; {{ currentYear }} Cultural Events</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
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
}
</style>