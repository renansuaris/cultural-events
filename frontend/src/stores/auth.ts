import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
import type { User, UserRole, LoginDTO, RegisterDTO, UpdateProfileDTO } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  
  const isLoggedIn = ref(false)
  const userRole = ref<UserRole | null>(null)
  const userId = ref<string | null>(null)
  const userName = ref<string>('')
  const usersList = ref<User[]>([])
  const isAdmin = computed(() => userRole.value === 'admin')

  async function login(loginData: LoginDTO) {
    const data = await AuthService.login(loginData)
    const { user, token } = data
    
    setAuthState(user.role, user.id, user.name)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user)) 

    return user 
  }

  async function register(registerData: RegisterDTO) {
    await AuthService.register(registerData)
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
      const data = await AuthService.fetchAllUsers()
      usersList.value = data
    } catch (error) {
      console.error('Falha ao obter usuarios', error)
    }
  }

  async function deleteUser(id: string) {
    await AuthService.deleteUser(id)
    await fetchAllUsers() 
  }

  function logout() {
    isLoggedIn.value = false
    userRole.value = null
    userId.value = null
    userName.value = ''
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  async function updateUserRole(id: string, newRole: UserRole) {
    await AuthService.updateRole(id, newRole)
    await fetchAllUsers()
  }

  async function updateProfile(id: string, updateData: UpdateProfileDTO) {
      await AuthService.updateProfile(id, updateData)
    
      if (userId.value === id) {
          userName.value = updateData.name
          const userStored = JSON.parse(localStorage.getItem('user') || '{}')
          userStored.name = updateData.name
          userStored.email = updateData.email
          localStorage.setItem('user', JSON.stringify(userStored))
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