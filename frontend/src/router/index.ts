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
import NotFoundPage from '../views/NotFoundPage.vue'
import { Routes } from '@/constants/routeNames'

type UserRole = 'admin' | 'user' | null

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- ROTAS PUBLICAS ---
    {
      path: '/',
      name: Routes.HOME,
      component: HomePage,
    },
    {
      path: '/evento/:id', 
      name: Routes.EVENT_DETAILS,
      component: EventDetailsPage,
    },
    {
      path: '/login',
      name: Routes.LOGIN,
      component: LoginPage,
    },
    {
      path: '/cadastro',
      name: Routes.REGISTER,
      component: RegisterPage,
    },
    {
      path: '/sobre',
      name: Routes.ABOUT,
      component: AboutPage,
    },
    // --- ROTAS DE USUARIO LOGADO ---
    {
      path: '/criar-evento',
      name: Routes.CREATE_EVENT,
      component: CreateEventPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/evento/:id/editar', 
      name: Routes.EDIT_EVENT,
      component: EditEventPage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/perfil',
      name: Routes.PROFILE,
      component: ProfilePage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/meus-eventos',
      name: Routes.MY_EVENTS,
      component: MyEventsPage,
      meta: { requiresAuth: true } 
    },
    // --- ROTAS DE ADMINISTRADOR ---
    {
      path: '/admin/eventos',
      name: Routes.ADMIN_EVENTS,
      component: AdminManageEventsPage,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/usuarios',
      name: Routes.ADMIN_USERS,
      component: AdminManageUsersPage,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/admin/categorias',
      name: Routes.ADMIN_CATEGORIES,
      component: AdminManageCategoriesPage,
      meta: { requiresAuth: true, role: 'admin' },
    },

    {
      path: '/admin',
      name: Routes.ADMIN_DASHBOARD,
      component: AdminDashboardPage,
      meta: { requiresAuth: true, role: 'admin' },
    },

    {
      path: '/:pathMatch(.*)*', 
      name: Routes.NOT_FOUND,
      component: NotFoundPage
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role as UserRole 

  if (requiresAuth && !auth.isLoggedIn) {
    next({ name: Routes.LOGIN }) 
  } else if (requiredRole && auth.userRole !== requiredRole) {
    next({ name: Routes.HOME }) 
  } else {
    next()
  }
})

export default router
