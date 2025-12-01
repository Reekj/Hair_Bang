<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

      <!-- Left: Logo -->
      <div class="flex-shrink-0">
        <div class=" text-white flex items-center justify-center font-bold text-lg">
          <LazyImage 
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/logo.png" 
            alt="HairBang Logo" 
            class="h-[57px] w-[113px]"
          />
        </div>
      </div>

      <!-- Center: Navigation Links -->
      <nav class="hidden md:flex space-x-[65px] font-medium text-[#6A2E18]">
        <RouterLink to="/" class="hover:text-black">Home</RouterLink>
        <RouterLink to="/wigs" class="hover:text-black">Wigs</RouterLink>
        <RouterLink to="/hair-accessories" class="hover:text-black">Hair Accessories</RouterLink>
        <RouterLink to="/jeans" class="hover:text-black">Jeans</RouterLink>
      </nav>

      <!-- Right: Search + User + Cart -->
      <div class="flex items-center space-x-4">
        <!-- Search Box -->
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search..."
            class=" border-[#00000080] border rounded-md w-[290px] pl-4 pr-10 py-2 w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <svg
            @click="performSearch"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"/>
          </svg>
        </div>

        <!-- User Icon -->
        <RouterLink to="/signup">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/userv.png" alt="" class="w-[15px] h-[15px]">
        </RouterLink>

        <RouterLink to="/signup">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png" alt="" class="w-[15px] h-[15px]">
        </RouterLink>

        <!-- Cart Icon -->
        <RouterLink to="/cart" class="relative">
          <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_cart.png" alt="" class="w-[20px] h-[20px]">
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </RouterLink>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
// import { useCartStore } from '@/stores/cart' // Pinia store for user-specific cart 

// Search logic
const searchQuery = ref('')
const router = useRouter()
const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}

// Pinia store for cart count
// const cartStore = useCartStore()
// const cartCount = computed(() => cartStore.items.length)
</script>

<style scoped>
/* optional additional styling */
</style>
