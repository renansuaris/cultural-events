<template>
  <main class="create-event-container">
    <h1>Criar Novo Evento</h1>
    <p class="subtitle">Preencha o formulário abaixo pra criar um evento</p>

    <EventForm 
      buttonText="Criar Evento"
      :isLoading="isLoading"
      :serverErrors="errors"
      @submit="handleCreate"
    />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event.store'
import EventForm from '@/components/EventForm.vue' 
import { useToast } from "vue-toastification";
import { useFormHandler } from '@/composables/useFormHandler';

const eventStore = useEventStore()
const router = useRouter()
const toast = useToast()

const { isLoading, errors, execute } = useFormHandler();

async function handleCreate(formData: any) {
  await execute(
    () => eventStore.createEvent(formData),
    () => {
      toast.success("Evento criado com sucesso!");
      router.push({ name: 'home' });
    }
  );
}
</script>

<style scoped>
.create-event-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}
</style>