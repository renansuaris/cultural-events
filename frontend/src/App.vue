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

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary: #F05537;     
  --primary-hover: #9b301b; 
  --primary-light: #FFF0ED; 
  --primary-focus: rgba(240, 85, 55, 0.2); 
  --text-dark: #2c3e50;    
}

.text-primary { 
  color: var(--primary); 
}

.bg-primary { 
  background-color: var(--primary); 
}

html, body, #app {
  font-family: 'Inter', sans-serif;
  color: var(--text-dark); 
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