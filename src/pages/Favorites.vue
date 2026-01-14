<template>
  <div class="w-full bg-[#F7EDE5] pb-20 min-h-screen">

    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 class="text-3xl sm:text-4xl md:text-5xl text-[#6A2E18] font-semibold">
        My Favorites
      </h1>
      <p class="text-[#6A2E18] mt-2 opacity-80">
        Products you’ve saved for later
      </p>
    </section>

    <!-- Favorites Grid -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
             grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
             gap-6 sm:gap-8"
    >
      <div
        v-for="item in favorites"
        :key="item._id"
        class="bg-white rounded-xl shadow-sm flex flex-col p-2"
      >
        <!-- Image -->
        <div class="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-4">
          <img
            :src="item.displayImage"
            :alt="item.name"
            class="w-full h-full object-cover rounded-xl"
          />

          <!-- Remove Favorite -->
          <button
            class="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
            @click="removeFavorite(item._id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 transition-colors duration-200"
              fill="#b13f32"
              stroke="#b13f32"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 
                  7.78l1.06 1.06L12 21.23l7.78-7.78 
                  1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </button>

        </div>

        <h3 class="text-[#6A2E18] font-medium text-base sm:text-lg px-4">
          {{ item.name }}
        </h3>

        <p class="text-[#6A2E18] text-sm mt-1 px-4">
          {{ item.description || "Premium collection" }}
        </p>

        <p class="text-[#6A2E18] font-medium text-lg mt-2 px-4">
          ${{ item.price }}
        </p>

        <router-link
          :to="`/product/${item._id}`"
          class="text-[#6A2E18] underline text-sm mt-1 px-4"
        >
          View Details
        </router-link>

        <button
          @click="addToCart(item._id)"
          class="mt-4 mx-4 mb-4 rounded-xl text-white text-sm font-medium h-11"
          style="background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%)"
        >
          Add to Cart
        </button>
      </div>

      <div
        v-if="!loading && favorites.length === 0"
        class="col-span-full text-center text-gray-600"
      >
        You have no favorite items yet.
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FavoritesPage",
  data() {
    return {
      favorites: [],
      loading: true
    };
  },
  async mounted() {
    await this.loadFavorites();
    window.addEventListener("favorites-updated", this.loadFavorites);
  },
  beforeUnmount() {
    window.removeEventListener("favorites-updated", this.loadFavorites);
  },
  methods: {
    async loadFavorites() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        this.loading = true;

        // 1️⃣ Get favorites
        const favRes = await axios.get(
          "https://wig-api.onrender.com/api/favorites",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const rawFavorites = favRes.data || [];

        // 2️⃣ Get all products once
        const prodRes = await axios.get(
          "https://wig-api.onrender.com/api/products"
        );
        const products = prodRes.data.products || prodRes.data || [];

        // 3️⃣ Normalize favorites + images
        this.favorites = rawFavorites
          .map(fav => {
            let product =
              typeof fav.productId === "object"
                ? fav.productId
                : products.find(p => p._id === fav.productId);

            if (!product) return null;

            return {
              ...product,
              displayImage:
                product.image ||
                (Array.isArray(product.images) && product.images.length
                  ? product.images[0]
                  : "https://via.placeholder.com/400x400")
            };
          })
          .filter(Boolean);

      } catch (err) {
        console.error("Failed to load favorites:", err);
      } finally {
        this.loading = false;
      }
    },

    async removeFavorite(productId) {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.delete(
          `https://wig-api.onrender.com/api/favorites/remove/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.favorites = this.favorites.filter(p => p._id !== productId);
        window.dispatchEvent(new Event("favorites-updated"));
      } catch (err) {
        console.error("Remove favorite failed:", err);
      }
    },

    async addToCart(productId) {
      const token = localStorage.getItem("token");
      if (!token) return toast.show("Please log in to add items to cart.", "error");

      await axios.post(
        "https://wig-api.onrender.com/api/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.dispatchEvent(new Event("cart-updated"));
    }
  }
};
</script>
