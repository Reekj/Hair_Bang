<template>
  <div class="w-full bg-[#F7EDE5] pb-20 overflow-x-hidden">
    <!-- Header Section -->
    <section>
      <div
        class="relative w-full h-[430px] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-cover bg-center mb-10"
        style="background-image: url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/hairaccecories1.png');"
      >
        <div class="absolute inset-0 bg-[rgba(255,255,255,0.6)]"></div>
        <div class="relative z-10 flex items-center justify-center h-full flex-col text-center px-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6A2E18] font-semibold">
            Premium Hair Collection
          </h1>
          <p class="text-[16px] sm:text-[18px] md:text-[20px] text-[#6A2E18] mt-2">
            Natural, comfortable, crafted to last.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="flex flex-wrap gap-3 items-center">

        <!-- SORT -->
        <select class="filter-select" v-model="sortBy">
          <option value="popular">Popular</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="latest">Latest</option>
        </select>

        <!-- LENGTH -->
        <select class="filter-select" v-model="filters.length">
          <option value="">All Lengths</option>
          <option v-for="l in filterOptions.lengths" :key="l" :value="l">
            {{ l }} inches
          </option>
        </select>

        <!-- COLOR -->
        <select class="filter-select" v-model="filters.color">
          <option value="">All Colors</option>
          <option v-for="c in filterOptions.colors" :key="c" :value="c">
            {{ c }}
          </option>
        </select>

        <!-- TEXTURE -->
        <select class="filter-select" v-model="filters.texture">
          <option value="">All Textures</option>
          <option v-for="t in filterOptions.textures" :key="t" :value="t">
            {{ t }}
          </option>
        </select>

        <!-- SEARCH -->
        <input
          type="text"
          placeholder="Search"
          class="filter-select w-[220px]"
          v-model="search"
        />
      </div>
    </section>

    <!-- Product Grid -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="item in filteredProducts"
        :key="item._id"
        class="bg-white rounded-xl shadow-sm flex flex-col p-2"
      >
        <img
          :src="item.images?.[0]"
          class="w-full h-64 object-cover rounded-xl mb-3"
        />

        <h3 class="text-[#6A2E18] font-medium text-base sm:text-[17px] md:text-lg leading-snug px-4">
          {{ item.name }}
        </h3>

        <p class="text-[#6A2E18] text-sm sm:text-[14px] mt-1 px-4">
          {{ item.description }}
        </p>

        <p class="text-[#6A2E18] font-medium text-lg sm:text-[20px] mt-2 px-4">
          ${{ item.price }}
        </p>

        <router-link
          :to="`/product/${item._id}`"
          class="text-[#6A2E18] underline text-sm sm:text-base mt-1 px-4"
        >
          View Details
        </router-link>

        <button
          class="mt-auto m-2 text-white rounded-lg h-10"
          style="background: linear-gradient(90deg, #b13f32, #4b1b15)"
          @click="addToCart(item._id)"
        >
          Add to Cart
        </button>
      </div>

      <div v-if="loading" class="col-span-full text-center">
        Loading products...
      </div>

      <div v-if="!loading && filteredProducts.length === 0" class="col-span-full text-center text-gray-500">
        No wigs found.
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "../stores/toast";

export default {
  name: "HairCollection",
  data() {
    return {
      products: [],
      loading: true,
      search: "",
      sortBy: "popular",

      filters: {
        length: "",
        color: "",
        texture: "",
      },

      filterOptions: {
        lengths: [],
        colors: [],
        textures: [],
      },
    };
  },

  async mounted() {
    await this.loadProducts();
    await this.loadFilterOptions();
  },

  computed: {
    filteredProducts() {
      let list = [...this.products];

      // SEARCH
      if (this.search) {
        const q = this.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        );
      }

      // LENGTH
      if (this.filters.length) {
        list = list.filter((p) => p.length === this.filters.length);
      }

      // COLOR
      if (this.filters.color) {
        list = list.filter((p) => p.color === this.filters.color);
      }

      // TEXTURE
      if (this.filters.texture) {
        list = list.filter((p) => p.texture === this.filters.texture);
      }

      // SORT
      if (this.sortBy === "priceLow") {
        list.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "priceHigh") {
        list.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "latest") {
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return list;
    },
  },

  methods: {
    async loadProducts() {
      try {
        const res = await axios.get("https://wig-api.onrender.com/api/products");
        this.products = res.data.filter(
          (p) => p.category?.slug === "wigs"
        );
      } catch (err) {
        toast.show("Failed to load products", "error");
      } finally {
        this.loading = false;
      }
    },

    async loadFilterOptions() {
      try {
        const res = await axios.get(
          "https://wig-api.onrender.com/api/products/filters/options"
        );
        this.filterOptions = res.data;
      } catch (err) {
        console.error("Failed to load filters");
      }
    },

    async addToCart(productId) {
      const token = localStorage.getItem("token");
      if (!token) return toast.show("Login required", "error");

      await axios.post(
        "https://wig-api.onrender.com/api/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.show("Added to cart", "success");
    },
  },
};
</script>

<style scoped>
.filter-select {
  @apply bg-white border border-gray-300 rounded-md py-2 px-3 text-sm text-[#6A2E18];
}
</style>
