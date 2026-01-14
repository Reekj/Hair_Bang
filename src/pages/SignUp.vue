<template>
  <div class="min-h-screen w-full relative flex items-center justify-center p-4">

    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-[url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/backgroud1.png')] 
             bg-cover bg-center"
    ></div>

    <!-- Gray Overlay -->
    <div class="absolute inset-0 bg-gray-800/40"></div>

    <!-- Registration Card -->
    <div class="relative w-[585px] h-[603px] max-w-md bg-[#FFF3EA] rounded-xl shadow-lg p-8 z-10">

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
          Sign up for free
      </h2>
      <p class="text-center text-sm text-[#6F3E2C] mt-1">
          Start shopping for YOUR style today!
      </p>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister" class="mt-6 space-y-4">

        <!-- Name -->
        <div>
          <label class="block text-sm text-[#6F3E2C] mb-1">Name</label>

          <!-- Gradient Border Wrapper -->
          <div class="rounded-md p-[3px] bg-gradient-to-r from-[#2D140B] to-[#E86434]">
            <input 
              v-model="name"
              type="text"
              placeholder="Enter your name"
              class="w-full rounded-sm bg-[#FFF3EA] px-4 py-2 
                    focus:outline-none placeholder:text-[#C9A79A]"
              required
            />
          </div>
        </div>

        <!-- Email -->
        <div class="">
          <label class="block text-sm text-[#6F3E2C] mb-1">Email</label>

          <!-- Gradient border wrapper -->
          <div class="rounded-md p-[3px] bg-gradient-to-r from-[#2D140B] to-[#E86434]">
            <input 
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full rounded-sm bg-[#FFF3EA] px-4 py-2
                    focus:outline-none placeholder:text-[#C9A79A]"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div class="">
          <label class="block text-sm text-[#6F3E2C] mb-1">Password</label>

          <!-- Gradient Border Wrapper -->
          <div class="rounded-md p-[3px] bg-gradient-to-r from-[#2D140B] to-[#E86434]">
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-sm bg-[#FFF3EA] px-4 py-2 
                    focus:outline-none placeholder:text-[#C9A79A]"
              required
            />
          </div>
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="w-full mt-[5px] py-3 text-white font-semibold rounded-md
                 bg-gradient-to-r from-[#B13F32] to-[#4B1B15] hover:opacity-90 transition"
        >
          Register
        </button>

      </form>

      <!-- Already have an account link -->
      <p class="text-center text-sm text-[#6F3E2C] mt-4">
        Already have an account?
        <RouterLink to="/login"
          class="text-[#B0431A] font-semibold hover:underline"
        >
          
          Sign in
        
        </RouterLink>
        
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from '../stores/toast.js';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

// Use your Render backend URL directly
const API_URL = "https://wig-api.onrender.com/api/auth/register";

async function handleRegister() {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json(); // always parse once

    if (!res.ok) {
      // Handle known backend messages
      toast.show(
        data.message || "Registration failed. Please try again.",
        "error"
      );
      return;
    }

    toast.show("Registration successful! Redirecting to login...", "success");

    setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (err) {
    console.error("Registration error:", err);
    toast.show("Network error. Please check your connection.", "error");
  }
}

</script>

