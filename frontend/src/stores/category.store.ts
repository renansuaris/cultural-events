import { ref } from 'vue'
import { defineStore } from 'pinia'
import CategoryService from '@/services/CategoryService'
import type { Category } from '@/types' 

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  async function fetchAllCategories() {
    try {
      const data = await CategoryService.getAll()
      categories.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createCategory(name: string) {
    await CategoryService.create(name)
    await fetchAllCategories()
  }
  
  async function deleteCategory(id: string) {
    await CategoryService.delete(id)
    await fetchAllCategories()
  }
  
  return { 
    categories, 
    fetchAllCategories,
    createCategory,
    deleteCategory
  }
})