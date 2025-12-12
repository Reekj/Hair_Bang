<template>
  <header class="bg-white shadow-md sticky top-0 z-50 w-full">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Left: Logo -->
      <div class="flex-shrink-0 w-[120px]">
        <RouterLink to="/">
          <LazyImage
          src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/logo.png"
          alt="HairBang Logo"
          class="h-10 w-auto object-contain"
        />
        </RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden text-[#6A2E18] focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-10 font-medium text-[#6A2E18]">
        <RouterLink to="/" class="hover:text-black">Home</RouterLink>
        <RouterLink to="/wigs" class="hover:text-black">Wigs</RouterLink>
        <RouterLink to="/accessories" class="hover:text-black"
          >Hair Accessories</RouterLink
        >
        <RouterLink to="/jeans" class="hover:text-black">Jeans</RouterLink>
      </nav>

      <!-- Right Side Icons (Desktop Only) -->
      <div class="hidden md:flex items-center space-x-5">
        <!-- User Icon with Dropdown -->
        <div class="relative" @click="toggleDropdown" ref="dropdownWrapper">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/userv.png"
            alt="User"
            class="w-[15px] h-[15px] cursor-pointer"
          />

          <!-- Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border py-2 z-50"
          >
            <template v-if="isLoggedIn">
              <div class="px-4 py-2 text-sm text-[#333] border-b">
                <p class="font-semibold">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <RouterLink
                v-if="user?.isAdmin"
                to="/admin"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Admin Dashboard
              </RouterLink>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <RouterLink
                to="/signup"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Register
              </RouterLink>
              <RouterLink
                to="/login"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Login
              </RouterLink>
            </template>
          </div>
        </div>

        <RouterLink to="/signup">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png"
            class="w-5 h-5"
          />
        </RouterLink>

        <RouterLink to="/cart" class="relative">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_cart.png"
            class="w-6 h-6"
          />
        </RouterLink>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="md:hidden bg-white px-4 pb-4 pt-2 shadow-lg space-y-4"
      >
        <!-- Mobile Search -->
        <div class="relative">
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        <!-- Mobile Nav Links -->
        <nav class="flex flex-col space-y-4 text-[#6A2E18] font-medium">
          <RouterLink to="/" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/wigs" @click="closeMenu">Wigs</RouterLink>
          <RouterLink to="/accessories" @click="closeMenu"
            >Hair Accessories</RouterLink
          >
          <RouterLink to="/jeans" @click="closeMenu">Jeans</RouterLink>
        </nav>

        <!-- Mobile Icons -->
        <div class="flex items-center justify-start space-x-6 pt-2">
          <!-- User Icon with Dropdown -->
        <div class="relative" @click="toggleDropdown" ref="dropdownWrapper">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/userv.png"
            alt="User"
            class="w-[15px] h-[15px] cursor-pointer"
          />

          <!-- Dropdown Menu -->
          <div
            v-if="showDropdown"
            class="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md border py-2 z-50"
          >
            <template v-if="isLoggedIn">
              <div class="px-4 py-2 text-sm text-[#333] border-b">
                <p class="font-semibold">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <RouterLink
                v-if="user?.isAdmin"
                to="/admin"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Admin Dashboard
              </RouterLink>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <RouterLink
                to="/signup"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Register
              </RouterLink>
              <RouterLink
                to="/login"
                class="block px-4 py-2 hover:bg-gray-100 text-sm text-[#333]"
              >
                Login
              </RouterLink>
            </template>
          </div>
        </div>
          <RouterLink to="/signup">
            <img
              src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png"
              class="w-5 h-5"
            />
          </RouterLink>
          <RouterLink to="/cart" class="relative">
            <img
              src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_cart.png"
              class="w-6 h-6"
            />
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { onMounted, onBeforeUnmount } from "vue"
import { useAuth } from "../stores/auth.js"
import { toast } from "../stores/toast.js";

const { user, isLoggedIn, logout, restoreFromLocalStorage } = useAuth()

// Restore user from localStorage on component mount
onMounted(() => {
  restoreFromLocalStorage()
})

const showDropdown = ref(false)
const dropdownWrapper = ref(null)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  logout()
  showDropdown.value = false
  toast.show("Logged out successfully", "success");
  setTimeout(() => {
        router.push("/");
      }, 1000);
}

// Close dropdown when clicking outside
const handleClickOutside = (e) => {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(e.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})

const searchQuery = ref("");
const router = useRouter();
const isOpen = ref(false);

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/search", query: { q: searchQuery.value } });
    searchQuery.value = "";
    isOpen.value = false;
  }
};

const closeMenu = () => {
  isOpen.value = false;
};
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
``
