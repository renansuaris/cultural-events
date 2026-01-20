<template>
  <main class="home-container">
    
    <section class="hero-section">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="hero-swiper"
      >
        <swiper-slide v-for="(banner, index) in banners" :key="index">
          <div class="banner-slide" :style="{ backgroundImage: `url(${banner.image})` }">
            <div class="banner-gradient">
              <div class="banner-text">
                <h2>{{ banner.title }}</h2>
                <p>{{ banner.subtitle }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div class="floating-search-wrapper">
        <div class="search-box">
          <font-awesome-icon icon="magnifying-glass" class="search-icon" /> 
          <input 
            type="text" 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Busque por eventos, shows, teatros..." 
            class="search-input"
          />
          <button @click="handleSearch" class="search-btn">Buscar</button>
        </div>
      </div>
    </section>

    <section class="discovery-section">
      <div class="categories-container">
        
        <button class="nav-arrow left" @click="scrollCategories('left')">
          <font-awesome-icon icon="chevron-left" />
        </button>

        <div class="categories-wrapper" ref="categoriesRef">
          <button 
            class="cat-pill" 
            :class="{ active: selectedCategory === '' }"
            @click="selectCategory('')"
          >
            Todas
          </button>
          <button 
            v-for="cat in categoryStore.categories" 
            :key="cat.id"
            class="cat-pill"
            :class="{ active: selectedCategory === cat.id }"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>

        <button class="nav-arrow right" @click="scrollCategories('right')">
          <font-awesome-icon icon="chevron-right" />
        </button>

      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        <h3>Próximos Eventos</h3>
      </div>

      <EventGrid :events="eventStore.events" :isLoading="isLoading" />

      <div v-if="eventStore.totalPages > 1" class="pagination-controls">
        <button 
          :disabled="eventStore.page === 1" 
          @click="changePage(eventStore.page - 1)"
          class="btn-page icon-only"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>

        <span class="page-info">{{ eventStore.page }} / {{ eventStore.totalPages }}</span>

        <button 
          :disabled="eventStore.page === eventStore.totalPages" 
          @click="changePage(eventStore.page + 1)"
          class="btn-page icon-only"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventStore } from '@/stores/event.store'
import { useCategoryStore } from '@/stores/category.store' 
import EventGrid from '@/components/EventGrid.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useToast } from 'vue-toastification' 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { HOME_BANNERS } from '@/constants/banners';
library.add(faMagnifyingGlass, faChevronLeft, faChevronRight)

const modules = [Autoplay, Pagination];
const banners = HOME_BANNERS
const eventStore = useEventStore()
const categoryStore = useCategoryStore() 
const toast = useToast() 
const isLoading = ref(true)
const selectedCategory = ref('') 
const searchQuery = ref('')
const categoriesRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    await Promise.all([
      eventStore.fetchAllEvents(),
      categoryStore.fetchAllCategories()
    ])
  } catch (error) {
    toast.error("Erro ao carregar dados iniciais.")
  } finally {
    isLoading.value = false
  }
})

function scrollCategories(direction: 'left' | 'right') {
  if (!categoriesRef.value) return
    const scrollAmount = 300 
  if (direction === 'left') {
    categoriesRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    categoriesRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

async function handleSearch() {
  isLoading.value = true
  try {
    await eventStore.fetchAllEvents(selectedCategory.value, 1, 6, searchQuery.value)
    document.querySelector('.content-section')?.scrollIntoView({ behavior: 'smooth' })
  } catch (error) {
    toast.error("Erro na busca.")
  } finally {
    isLoading.value = false
  }
}

async function selectCategory(id: string) {
  selectedCategory.value = id
  isLoading.value = true
  try {
    await eventStore.fetchAllEvents(selectedCategory.value, 1, 6, searchQuery.value)
  } catch (error) {
    toast.error("Erro ao filtrar.")
  } finally {
    isLoading.value = false
  }
}

async function changePage(newPage: number) {
  isLoading.value = true
  try {
    await eventStore.fetchAllEvents(selectedCategory.value, newPage, 6, searchQuery.value)
    document.querySelector('.content-section')?.scrollIntoView({ behavior: 'smooth' })
  } catch(error) {
    toast.error("Erro na paginação")
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f8f9fa; 
}
.hero-section {
  position: relative;
  margin-bottom: 3rem; 
}
.hero-swiper {
  height: 400px; 
}
.banner-slide {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}
.banner-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 100%); 
  display: flex;
  align-items: center;
  padding-left: 10%; 
}
.banner-text {
  color: white;
  max-width: 500px;
}
.banner-text h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  letter-spacing: -1px;
}
.banner-text p {
  font-size: 1.2rem;
  opacity: 0.9;
}
.floating-search-wrapper {
  position: absolute;
  bottom: -25px;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}
.search-box {
  background: white;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
  border: 1px solid rgba(0,0,0,0.05);
}
.search-icon {
  color: #999;
  margin-left: 1rem;
  font-size: 1.2rem;
}
.search-input {
  flex: 1;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  outline: none;
  color: var(--text-dark);
}
.search-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
}
.search-btn:hover {
  background-color: var(--primary-hover);
}

.discovery-section {
  padding-top: 4rem; 
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
}

.categories-container {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1200px; 
  width: 100%;
  padding: 0 1rem;
}

.categories-wrapper {
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding: 0.5rem 0.5rem;
  scroll-behavior: smooth; 
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.categories-wrapper::-webkit-scrollbar {
  display: none;
}

.cat-pill {
  background: white;
  border: 1px solid #eee;
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  flex-shrink: 0; 
}
.cat-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.cat-pill.active {
  background-color: var(--primary-light); 
  color: var(--primary);
  border-color: var(--primary);
}
.nav-arrow {
  background: white;
  border: 1px solid #eee;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #555;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;
  transition: all 0.2s;
  flex-shrink: 0; 
}
.nav-arrow:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: scale(1.1);
}
.nav-arrow.left {
  margin-right: 10px;
}
.nav-arrow.right {
  margin-left: 10px;
}
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.section-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}
.pagination-controls {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.btn-page {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-page:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}
.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>