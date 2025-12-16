import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'
import api from '@/services/api'

type UserRole = 'admin' | 'user' | null

type RegisterData = {
  name: string
  email: string
  password: string
}

export interface IUser {
  id: string
  name: string
  email: string
  role: UserRole
}

type LoginData = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  
  const isLoggedIn = ref(false)
  const userRole = ref<UserRole>(null) 
  const userId = ref<string | null>(null)
  const userName = ref<string>('')

  const usersList = ref<IUser[]>([])

  const isAdmin = computed(() => userRole.value === 'admin')

  async function login(loginData: LoginData) {
    try {
      const { data } = await api.post('/login', loginData)
      const { user, token } = data
      setAuthState(user.role, user.id, user.name)
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user)) 

      return { success: true, role: user.role }
    } catch (error: any) {
      console.error(error)
      const msg = error.response?.data?.message || 'Erro de conexão'
      return { success: false, error: msg }
    }
  }

  async function register(registerData: RegisterData) {
    try {
      const { data } = await api.post('/users', registerData)

      return { success: true }

    } catch (error: any) {
      const msg = error.response?.data?.message || 'Erro ao cadastrar'
      return { success: false, error: msg }
    }
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    const userStored = localStorage.getItem('user')

    if (token && userStored) {
      const user = JSON.parse(userStored)
      setAuthState(user.role, user.id, user.name)
    } else {
      logout()
    }
  }

  async function fetchAllUsers() {
    try {
      const { data } = await api.get('/users') 
      usersList.value = data
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUser(id: string) {
    try {
      await api.delete(`/users/${id}`)
      await fetchAllUsers() 
      return true
    } catch (error) {
      return false
    }
  }

  function logout() {
    isLoggedIn.value = false
    userRole.value = null
    userId.value = null
    userName.value = ''
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // FAZER A DE ATUALIZAR ROLE NO BACK
  async function updateUserRole(id: string, newRole: UserRole) {
     console.warn("Funcionalidade pendente de backend")
     return false
  }

  async function updateProfile(id: string, updateData: any) {
      try {
          await api.put(`/users/${id}`, updateData)
          
          if (userId.value === id) {
              userName.value = updateData.name
              const userStored = JSON.parse(localStorage.getItem('user') || '{}')
              userStored.name = updateData.name
              userStored.email = updateData.email
              localStorage.setItem('user', JSON.stringify(userStored))
          }
          
          return true
      } catch (error) {
          return false
      }
  }

  function setAuthState(role: UserRole, id: string, name: string) {
    isLoggedIn.value = true
    userRole.value = role
    userId.value = id
    userName.value = name
  }

  return {
    isLoggedIn,
    userRole,
    userId,
    userName,
    isAdmin,
    usersList,
    login,
    register,
    logout,
    checkToken,
    fetchAllUsers,
    deleteUser,
    updateUserRole,
    updateProfile
  }
})