import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface ICategory {
  id: string
  name: string
}

export const useCategoryStore = defineStore('category', () => {

  const categories = ref<ICategory[]>([])
  
  const API_URL = 'http://localhost:3000'

  async function fetchAllCategories() {
    try {
      const response = await fetch(`${API_URL}/categories`)
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias')
      }
      categories.value = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  async function createCategory(name: string) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }) 
      })
      if (!response.ok) {
        throw new Error('Erro ao criar categoria')
      }
      await fetchAllCategories()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  
  async function deleteCategory(id: string) {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Erro ao deletar categoria')
      }
  
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