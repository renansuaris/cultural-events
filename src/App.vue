<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html, body, #app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>