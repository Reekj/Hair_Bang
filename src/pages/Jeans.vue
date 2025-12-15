<template>
  <div class="w-full bg-[#F7EDE5] pb-20 overflow-x-hidden">

    <!-- Header Section -->
    <section>
      <div
        class="relative w-full h-[430px] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-cover bg-center mb-10"
        style="background-image: url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/jeans_header.jpg')"
      >
        <div class="absolute inset-0 bg-[rgba(255,255,255,0.6)]"></div>

        <div class="relative z-10 flex items-center justify-center h-full flex-col text-center px-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6A2E18] font-semibold leading-snug">
            Premium Jeans Collection
          </h1>
          <p class="text-[16px] sm:text-[18px] md:text-[20px] text-[#6A2E18] mt-2 opacity-90">
            Stylish, long-lasting & built for comfort.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Row -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-10"
    >
      <div class="flex flex-wrap gap-3 sm:gap-6 items-center">
        <p class="text-[#6A2E18]">Sort by:</p>

        <select class="filter-select w-full sm:w-[160px] h-[43px]">
          <option>Popular</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px]">
          <option>Color</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px]">
          <option>Material</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px]">
          <option>Size</option>
        </select>
      </div>

      <!-- Search Box -->
      <div class="relative w-full sm:w-[265px] min-w-0 mt-3 sm:mt-0">
        <input
          type="text"
          placeholder="Search"
          class="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
          v-model="search"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
      </div>
    </section>

    <!-- Product Grid -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
    >
      <div
        v-for="item in filteredProducts"
        :key="item._id"
        class="bg-white rounded-xl shadow-sm flex flex-col p-2"
      >
        <!-- Image -->
        <div class="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-4">
          <img
            :src="item.image"
            class="w-full h-full object-cover rounded-xl"
            :alt="item.name"
          />

          <!-- Heart Icon -->
          <button
            @click="toggleFavorite(item._id)"
            class="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
          >
            <img
              :src="favorites.includes(item._id) 
                ? 'https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-heart-filled.svg'
                : 'https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png'"
              alt="like"
              class="w-[18px] h-[18px]"
            />
          </button>
        </div>

        <!-- Title -->
        <h3 class="text-[#6A2E18] font-medium text-base sm:text-[17px] md:text-lg leading-snug px-4">
          {{ item.name }}
        </h3>

        <!-- Small Description -->
        <p class="text-[#6A2E18] text-sm sm:text-[14px] mt-1 px-4">
          {{ item.description || 'Premium high-quality denim' }}
        </p>

        <!-- Price -->
        <p class="text-[#6A2E18] font-medium text-lg sm:text-[20px] mt-2 px-4">
          ${{ item.price }}
        </p>

        <!-- View Details Link -->
        <router-link
          :to="`/product/${item._id}`"
          class="text-[#6A2E18] underline text-sm sm:text-base mt-1 px-4"
        >
          View Details
        </router-link>

        <!-- Add to Cart -->
        <button
          @click="addToCart(item._id)"
          class="mt-auto mx-4 mb-4 rounded-xl text-white text-sm sm:text-base font-medium h-10 sm:h-12 w-auto"
          style="background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%)"
        >
          Add to Cart
        </button>
      </div>

      <div v-if="loading" class="col-span-full text-center text-gray-700">Loading products...</div>
      <div v-if="!loading && filteredProducts.length === 0" class="col-span-full text-center text-gray-500">
        No jeans available.
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";
import { toast } from "../stores/toast";

export default {
  name: "JeansPage",
  data() {
    return {
      products: [],
      favorites: [],
      loading: true,
      error: null,
      search: ""
    };
  },
  computed: {
    filteredProducts() {
      if (!this.search) return this.products;
      const q = this.search.toLowerCase().trim();
      return this.products.filter(p =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    }
  },
  async mounted() {
    await this.loadProducts();
    await this.loadFavorites();
    window.addEventListener("favorites-updated", this.loadFavorites);
  },
  beforeUnmount() {
    window.removeEventListener("favorites-updated", this.loadFavorites);
  },
  methods: {
    async loadProducts() {
      this.loading = true;
      try {
        const res = await axios.get("https://wig-api.onrender.com/api/products");
        const allProducts = res.data.products || res.data || [];

        // Filter by category slug (jeans)
        this.products = allProducts.filter(
          (p) => p.category?.slug === "jeans"
        );
      } catch (err) {
        console.error(err);
        this.error = "Failed to load products.";
      } finally {
        this.loading = false;
      }
    },

    async addToCart(productId) {
      const token = localStorage.getItem("token");
      if (!token) return toast.show("Please log in to add items to cart.", "error");

      try {
        const res = await axios.post(
          "https://wig-api.onrender.com/api/cart/add",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data?.success || res.status === 200) {
          toast.show("Product added to cart!", "success");
          window.dispatchEvent(new Event("cart-updated"));
        } else {
          toast.show("Failed to add product to cart.", "error");
        }
      } catch (err) {
        console.error("Add to cart failed:", err);
        toast.show("Error adding product to cart.", "error");
      }
    },

    /** ----------------------------
     * FAVORITES FUNCTIONALITY
     ----------------------------- */
    async loadFavorites() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "https://wig-api.onrender.com/api/favorites",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // ✅ map to product IDs for heart logic
        this.favorites = (res.data || [])
          .map(f => f.productId?._id)
          .filter(Boolean);

      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    },

    async toggleFavorite(productId) {
      const token = localStorage.getItem("token");
      if (!token) return alert("You need to log in first.");

      const isFav = this.favorites.includes(productId);

      try {
        if (!isFav) {
          await axios.post(
            "https://wig-api.onrender.com/api/favorites/add",
            { productId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.favorites.push(productId);
        } else {
          await axios.delete(
            `https://wig-api.onrender.com/api/favorites/remove/${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.favorites = this.favorites.filter(id => id !== productId);
        }

        // ✅ notify Favorites page
        window.dispatchEvent(new Event("favorites-updated"));
      } catch (err) {
        console.error("Failed to update favorite:", err);
        alert("Could not update favorite.");
      }
    }
  }
};
</script>

<style scoped>
.filter-select {
  @apply bg-white border border-gray-300 text-black text-sm rounded-md py-2 px-3;
}

* {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
