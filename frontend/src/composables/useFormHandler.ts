import { ref } from 'vue';
import { useToast } from "vue-toastification";
import type { ApiResponseError } from '@/types/ApiError'; 

export function useFormHandler() {
  const toast = useToast();
  
  const isLoading = ref(false);
  const errors = ref<Record<string, string>>({});

  async function execute<T>(
    action: () => Promise<T>, 
    onSuccess?: (result: T) => void
  ) {
    isLoading.value = true;
    errors.value = {}; 

    try {
      const result = await action();
      if (onSuccess) onSuccess(result);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const apiError = error.response.data as ApiResponseError;
        toast.warning(apiError.message || "Verifique os campos destacados.");
        
        if (apiError.errors) {
          apiError.errors.forEach(err => {
            errors.value[err.field] = err.message;
          });
        }
      } else {
        const msg = error.response?.data?.message || "Ocorreu um erro inesperado.";
        toast.error(msg);
        console.error(error);
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    errors,
    execute
  };
}