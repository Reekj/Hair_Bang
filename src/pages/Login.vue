<template>
  <div
    class="min-h-screen w-full relative flex items-center justify-center p-4"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-[url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/backgroud1.png')] bg-cover bg-center"
    ></div>

    <!-- Gray Overlay -->
    <div class="absolute inset-0 bg-gray-800/40"></div>

    <!-- Login Card -->
    <div
      class="relative w-[585px] h-[603px] max-w-md bg-[#FFF3EA] rounded-xl shadow-lg p-8 z-10"
    >
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

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm text-[#6F3E2C] mb-1">Email</label>

          <!-- Gradient Border Wrapper -->
          <div
            class="rounded-md p-[3px] bg-gradient-to-r from-[#2D140B] to-[#E86434]"
          >
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full rounded-sm bg-[#FFF3EA] px-4 py-2 focus:outline-none placeholder:text-[#C9A79A]"
              required
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm text-[#6F3E2C] mb-1">Password</label>

          <!-- Gradient Border Wrapper -->
          <div
            class="rounded-md p-[3px] bg-gradient-to-r from-[#2D140B] to-[#E86434]"
          >
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-sm bg-[#FFF3EA] px-4 py-2 focus:outline-none placeholder:text-[#C9A79A]"
              required
            />
          </div>
        </div>

        <!-- Forgot password -->
        <div class="text-right">
          <button type="button" class="text-xs text-[#B0431A] hover:underline">
            Forgot password?
          </button>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full mt-[5px] py-3 text-white font-semibold rounded-md bg-gradient-to-r from-[#B13F32] to-[#4B1B15] hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      <!-- Don’t have an account link -->
      <p class="text-center text-sm text-[#6F3E2C] mt-4">
        Don’t have an account?
        <RouterLink
          to="/signup"
          class="text-[#B0431A] font-semibold hover:underline"
        >
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth.js";

const router = useRouter();
const { setUser } = useAuth();
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const API_URL = "https://wig-api.onrender.com/api/auth/login";

async function handleLogin() {
  if (!email.value || !password.value) {
    alert("Please enter email and password");
    return;
  }

  isLoading.value = true;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      alert("Login failed: Invalid email or password");
      return;
    }

    const data = await res.json();

    // Save token for authenticated requests
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Save user info
    localStorage.setItem("user", JSON.stringify(data.user || data));

    // Set user in your store
    setUser(data);

    // Redirect
    if (data.isAdmin) {
      alert("Admin login successful! Redirecting to dashboard...");
      router.push("/admin");
    } else {
      alert("Login successful! Redirecting to home...");
      router.push("/");
    }

  } catch (e) {
    console.error(e);
    alert("An error occurred during login. Please try again.");
  } finally {
    isLoading.value = false;
  }
}
</script>
