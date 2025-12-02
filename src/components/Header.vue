<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

      <!-- Left: Logo -->
      <div class="flex-shrink-0">
        <LazyImage 
          src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/logo.png" 
          alt="HairBang Logo" 
          class="h-[50px] w-auto"
        />
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden text-[#6A2E18]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-[65px] font-medium text-[#6A2E18]">
        <RouterLink to="/" class="hover:text-black">Home</RouterLink>
        <RouterLink to="/wigs" class="hover:text-black">Wigs</RouterLink>
        <RouterLink to="/accessories" class="hover:text-black">Hair Accessories</RouterLink>
        <RouterLink to="/jeans" class="hover:text-black">Jeans</RouterLink>
      </nav>

      <!-- Right Side (Search, User, Cart) -->
      <div class="hidden md:flex items-center space-x-4">

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search..."
            class="border border-[#00000080] rounded-md pl-4 pr-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <svg
            @click="performSearch"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
          </svg>
        </div>

        <!-- Icons -->
        <RouterLink to="/signup">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/userv.png" class="w-5 h-5" />
        </RouterLink>

        <RouterLink to="/signup">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png" class="w-5 h-5" />
        </RouterLink>

        <RouterLink to="/cart" class="relative">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_cart.png" class="w-6 h-6" />
        </RouterLink>
      </div>
    </div>

    <!-- ========================= -->
    <!-- Mobile Dropdown Menu -->
    <!-- ========================= -->
    <transition name="slide">
      <div v-if="isOpen" class="md:hidden bg-white px-4 pb-4 shadow-lg">

        <!-- Mobile Search -->
        <div class="relative mb-4">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search..."
            class="border border-[#00000080] rounded-md pl-4 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <svg
            @click="performSearch"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
          </svg>
        </div>

        <!-- Mobile Nav Links -->
        <nav class="flex flex-col space-y-4 text-[#6A2E18] font-medium">
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/wigs" @click="closeMenu">Wigs</RouterLink>
          <RouterLink to="/hair-accessories" @click="closeMenu">Hair Accessories</RouterLink>
          <RouterLink to="/jeans" @click="closeMenu">Jeans</RouterLink>
        </nav>

        <!-- Mobile Icons -->
        <div class="flex items-center space-x-6 mt-5">
          <RouterLink to="/signup">
            <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/userv.png" class="w-5 h-5" />
          </RouterLink>

          <RouterLink to="/signup">
            <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png" class="w-5 h-5" />
          </RouterLink>

          <RouterLink to="/cart" class="relative">
            <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_cart.png" class="w-6 h-6" />
          </RouterLink>
        </div>

      </div>
    </transition>

  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()
const isOpen = ref(false)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
    searchQuery.value = ''
    isOpen.value = false
  }
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
