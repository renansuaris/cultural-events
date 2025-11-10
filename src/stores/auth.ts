import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'

type UserRole = 'admin' | 'user' | null

type RegisterData = {
  name: string
  email: string
  password: string
}

type loginData = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  
  const isLoggedIn = ref(false)
  const userRole = ref<UserRole>(null) 
  const userId = ref<string | null>(null)
  
  const API_URL = 'http://localhost:3000'

  const isAdmin = computed(() => userRole.value === 'admin')

  function setAuthState(role: UserRole, id: string | null) {
    isLoggedIn.value = true
    userRole.value = role
    userId.value = id
  }

  function logout() {
    isLoggedIn.value = false
    userRole.value = null
    userId.value = null 
  }

  async function register(registerData: RegisterData) {
    const { name, email, password } = registerData
    try {
      const emailCheck = await fetch(`${API_URL}/users?email=${email}`)
      const existingUsers = await emailCheck.json()

      if (existingUsers.length > 0) {
        return { success: false, error: 'Este email já está cadastrado.' }
      }

      const newUser = {
        name,
        email,
        password,
        role: 'user' 
      }

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        throw new Error('Erro ao registrar no servidor')
      }

      const createdUser = await response.json()

      setAuthState(createdUser.role, createdUser.id)

      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Ocorreu um erro de conexão.' }
    }
  }

  async function login(loginData: LoginData) {
    const { email, password } = loginData
    try {
      const response = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      )
      const users = await response.json()

      if (users.length === 0) {
        return { success: false, error: 'Email ou senha inválidos.' }
      }

      const user = users[0] 
      setAuthState(user.role, user.id) 

      return { success: true, role: user.role as UserRole, id: user.id }
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Ocorreu um erro de conexão.' }
    }
  }

  return {
    isLoggedIn,
    userRole,
    userId,
    isAdmin,
    setAuthState,
    logout,
    register,
    login
  }
})