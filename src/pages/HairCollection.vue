<template>
  <div class="w-full bg-[#F7EDE5] pb-20 overflow-x-hidden">

    <!-- Header Section -->
    <section>
      <div
        class="relative w-full h-[430px] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-cover bg-center mb-10"
        style="background-image: url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/hairaccecories1.png')"
      >
        <div class="absolute inset-0 bg-[rgba(255,255,255,0.6)]"></div>

        <div class="relative z-10 flex items-center justify-center h-full flex-col text-center px-4">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6A2E18] font-semibold leading-snug">
            Premium Hair Collection
          </h1>
          <p class="text-[16px] sm:text-[18px] md:text-[20px] text-[#6A2E18] mt-2 opacity-90">
            Natural, comfortable, crafted to last.
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

        <select class="filter-select w-full sm:w-[160px] h-[43px] text-[#6A2E18CC] rounded-md">
          <option class="text-[#6A2E18CC]">Popular</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px] text-[#6A2E18CC] rounded-md">
          <option class="text-[#6A2E18CC]">Length</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px] text-[#6A2E18CC] rounded-md">
          <option class="text-[#6A2E18CC]">Color</option>
        </select>

        <select class="filter-select w-full sm:w-[160px] h-[43px] text-[#6A2E18CC] rounded-md">
          <option class="text-[#6A2E18CC]">Texture</option>
        </select>
      </div>

      <!-- Search Box -->
      <div class="relative w-full sm:w-[265px] min-w-0 mt-3 sm:mt-0">
        <input 
          type="text" 
          placeholder="Search" 
          class="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
        />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
      </div>
    </section>

    <!-- Product Grid -->
    <section
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
             grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
             gap-6 sm:gap-8"
    >
      <div
        v-for="item in products"
        :key="item.id"
        class="bg-white rounded-xl shadow-sm flex flex-col p-2"
      >
        <!-- Image Container -->
        <div class="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-4">
          <img 
            :src="item.image" 
            class="w-full h-full object-cover rounded-xl" 
          />

          <!-- Heart Icon -->
          <button class="absolute top-3 right-3 bg-none p-2 rounded-full">
            <img 
              src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png"
              class="w-6 h-6"
            />
          </button>
        </div>

        <!-- Title -->
        <h3 class="text-[#6A2E18] font-medium text-base sm:text-[17px] md:text-lg leading-snug px-4">
          {{ item.title }}
        </h3>

        <!-- Small Description -->
        <p class="text-[#6A2E18] text-sm sm:text-[14px] mt-1 px-4">
          Premium human hair collection
        </p>

        <!-- Price -->
        <p class="text-[#6A2E18] font-medium text-lg sm:text-[20px] mt-2 px-4">
          ${{ item.price }}
        </p>

        <!-- ⭐ View Details Link -->
        <router-link
          :to="`/product/${item.id}`"
          class="text-[#6A2E18] underline text-sm sm:text-base mt-1 px-4"
        >
          View Details
        </router-link>

        <!-- Add to Cart -->
        <button
          class="mt-auto mx-4 mb-4 rounded-xl text-white text-sm sm:text-base font-medium h-10 sm:h-12 w-auto"
          style="background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%)"
        >
          Add to Cart
        </button>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: "HairCollection",

  data() {
    return {
      products: [
        { id: 1, title: "Luxury 18” Body Wave Raw Hair", price: 299, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair3.png" },
        { id: 2, title: "Luxury 22” Loose Deepwave", price: 180, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair2.png" },
        { id: 3, title: "Luxury 6” Water Curly 13x4", price: 120, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair3.jpg" },
        { id: 4, title: "Luxury 22” Loose Deepwave", price: 180, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair4.png" },
        { id: 5, title: "Luxury 6” Water Curly 13”x4”", price: 120, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair4.png" },
        { id: 6, title: "Luxury 22” Loose Deepwave", price: 180, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair2.png" },
        { id: 7, title: "Luxury 18” Body Wave Raw Hair", price: 299, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair3.png" },
        { id: 8, title: "Luxury 6” Water Curly 13x4", price: 120, image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair3.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
.filter-select {
  @apply bg-white border border-gray-300 text-black text-sm rounded-md py-2 px-3;
}

/* Prevent ANY overflow issues */
* {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
