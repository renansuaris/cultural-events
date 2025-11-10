<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">Eventos</RouterLink> |

      <span v-if="auth.isLoggedIn">
        <RouterLink :to="{ name: 'create-event' }">Criar Evento</RouterLink> |

        <RouterLink v-if="!auth.isAdmin" :to="{ name: 'my-events' }"> Meus Eventos </RouterLink> |

        <RouterLink :to="{ name: 'profile' }">Minha Conta</RouterLink> |

        <RouterLink v-if="auth.isAdmin" :to="{ name: 'admin-dashboard' }"> Admin </RouterLink> |

        <a @click="handleLogout" href="#">Logout</a>
      </span>
      <span v-else>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </span>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
