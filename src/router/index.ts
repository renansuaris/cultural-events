import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import EventDetailsPage from '../views/EventDetailsPage.vue'
import CreateEventPage from '../views/CreateEventPage.vue'
import AdminDashboardPage from '../views/AdminDashBoardPage.vue'
import { useAuthStore } from '@/stores/auth'
import ProfilePage from '../views/ProfilePage.vue'
import EditEventPage from '../views/EditEventPage.vue'
import AdminManageEventsPage from '../views/AdminManageEventsPage.vue'
import AdminManageUsersPage from '../views/AdminManageUsersPage.vue'
import AdminManageCategoriesPage from '../views/AdminManageCategoriesPage.vue'
import MyEventsPage from '@/views/MyEventsPage.vue'

type UserRole = 'admin' | 'user' | null

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- ROTAS PUBLICAS ---
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/evento/:id', 
      name: 'event-details',
      component: EventDetailsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/cadastro',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/sobre',
      name: 'about',
      component: AboutPage,
    },
    // --- ROTAS DE USUARIO LOGADO ---
    {
      path: '/criar-evento',
      name: 'create-event',
      component: CreateEventPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/evento/:id/editar', 
      name: 'edit-event',
      component: EditEventPage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/perfil',
      name: 'profile',
      component: ProfilePage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/meus-eventos',
      name: 'my-events',
      component: MyEventsPage,
      meta: { requiresAuth: true } 
    },
    // --- ROTAS DE ADMINISTRADOR ---
    {
      path: '/admin/eventos',
      name: 'admin-events',
      component: AdminManageEventsPage,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/usuarios',
      name: 'admin-users',
      component: AdminManageUsersPage,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/categorias',
      name: 'admin-categories',
      component: AdminManageCategoriesPage,
      meta: { requiresAuth: true, role: 'admin' },
    },

    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboardPage,
      meta: { requiresAuth: true, role: 'admin' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role as UserRole 

  if (requiresAuth && !auth.isLoggedIn) {
    next({ name: 'login' }) 
  } else if (requiredRole && auth.userRole !== requiredRole) {
    next({ name: 'home' }) 
  } else {
    next()
  }
})

export default router
