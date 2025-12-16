import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export interface ICategory {
  id: string
  name: string
}

export const useCategoryStore = defineStore('category', () => {

  const categories = ref<ICategory[]>([])

  async function fetchAllCategories() {
    try {
      const { data } = await api.get('/categories')
      categories.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function createCategory(name: string) {
    try {
      await api.post('/categories', { name })
      await fetchAllCategories()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  
  async function deleteCategory(id: string) {
    try {
      await api.delete(`/categories/${id}`)
      await fetchAllCategories()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  
  return { 
    categories, 
    fetchAllCategories,
    createCategory,
    deleteCategory
  }
})