<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import AppFooter from './components/AppFooter.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkToken()
})
</script>

<template>
  <div class="app-layout">
    <TheHeader />
    <div class="main-content">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>
<style>

/*@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'); */

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

:root {
  --primary: #059669;       
  --primary-hover: #047857; 
  --primary-light: #d1fae5; 
  --primary-focus: rgba(5, 150, 105, 0.2); 
  --text-dark: #2c3e50;
}

.text-primary { 
  color: var(--primary); 
}

.bg-primary { 
  background-color: var(--primary); 
}

html, body, #app {
  font-family: 'PT Sans', sans-serif;  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>