<template>
    <div class="min-h-screen w-full relative flex items-center justify-center p-4">
  
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-[url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/backgroud1.png')] 
               bg-cover bg-center"
      ></div>
  
      <!-- Gray Overlay -->
      <!-- <div class="absolute inset-0 bg-gray-800/40"></div> -->
  
      <!-- Card -->
      <div class="relative w-full max-w-md bg-[#FFF3EA] rounded-xl shadow-lg p-8 z-10">
  
        <!-- Logo -->
        <div class="flex justify-center mb-4">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/logo.png"
            alt="Her Hair Bang Logo"
            class="h-14 object-contain"
          />
        </div>
  
        <!-- Headings -->
        <h2 class="text-center text-2xl font-semibold text-[#5E1F12]">
          Welcome back
        </h2>
        <p class="text-center text-sm text-[#6F3E2C] mt-1">
          Login to continue shopping
        </p>
  
        <!-- Form -->
        <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
  
          <!-- Email -->
          <div>
            <label class="block text-sm text-[#6F3E2C] mb-1">Email</label>
            <input 
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-[#B0431A] px-4 py-2 
                     focus:outline-none focus:border-[#7A2D12] placeholder:text-[#C9A79A]"
            />
          </div>
  
          <!-- Password -->
          <div>
            <label class="block text-sm text-[#6F3E2C] mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-md border border-[#B0431A] px-4 py-2 
                     focus:outline-none focus:border-[#7A2D12] placeholder:text-[#C9A79A]"
            />
          </div>
  
          <!-- Forgot password -->
          <div class="text-right">
            <button 
              type="button" 
              class="text-xs text-[#B0431A] hover:underline"
            >
              Forgot password?
            </button>
          </div>
  
          <!-- Login Button -->
          <button
            type="submit"
            class="w-full mt-2 py-3 text-white font-semibold rounded-md
                   bg-gradient-to-r from-[#B13F32] to-[#4B1B15] hover:opacity-90 transition"
          >
            Login
          </button>
  
        </form>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const email = ref("");
  const password = ref("");
  
  function handleLogin() {
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    // Hook your API here
  }
  </script>
  