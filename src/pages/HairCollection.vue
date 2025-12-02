<template>
    <div class="w-full bg-[#F7EDE5] pb-20">
      <!-- Header Section -->
      <section>
        <div
            class="relative w-full h-[430px] bg-cover bg-center mb-[40.5px]"
            style="background-image: url('https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/hairaccecories1.png')"
            >
            <!-- Grey transparent overlay -->
            <div class="absolute inset-0 bg-[rgba(255,255,255,0.6)]"></div>

            <!-- Content -->
            <div class="relative z-10 flex items-center justify-center h-full flex-col text-white">
                <h1 class="text-[42px] text-[#6A2E18] font-semibold">Premium Hair Collection</h1>
                <p class="text-base text-[20px] text-[#6A2E18] mt-2 opacity-90">Natural, comfortable, crafted to last. </p>
            </div>
        </div>

      </section>
  
      <!-- Filters Row -->
      <section class="max-w-7xl mx-auto px-6 flex items-center justify-between mb-10">
        <div class="flex gap-[54px]">
            <p>Sort by:</p>

            <select class="filter-select w-[160px] h-[43px] px-[10px] text-[#6A2E18CC] rounded-md">
                <option class="text-[#6A2E18CC]">Popular</option>
            </select>

            <select class="filter-select w-[160px] h-[43px] px-[10px] text-[#6A2E18CC] rounded-md">
                <option class="text-[#6A2E18CC]">Length</option>
            </select>

            <select class="filter-select w-[160px] h-[43px] px-[10px] text-[#6A2E18CC] rounded-md">
                <option class="text-[#6A2E18CC]">Color</option>
            </select>

            <select class="filter-select w-[160px] h-[43px] px-[10px] text-[#6A2E18CC] rounded-md">
                <option class="text-[#6A2E18CC]">Texture</option>
            </select>
        </div>

  
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search" 
            class="w-[265px] bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
        </div>
      </section>
  
      <!-- Product Grid -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[120px] px-6">
        <div
          v-for="item in products"
          :key="item.id"
          class="bg-white rounded-[10px] shadow-sm"
          style="width: 319px; height: 597px; padding: 20px 22px;"
        >
          <!-- Image Container -->
          <div class="relative w-full mb-4">
            <img 
              :src="item.image" 
              class="w-full h-[400px] object-cover rounded-xl" 
            />
  
            <!-- Heart Icon -->
            <button class="absolute top-3 right-3 bg-none p-2 rounded-full shadow">
              <img src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png" alt="" class="text-[#6A2E18]">
            </button>
          </div>
  
          <!-- Title -->
          <h3 class="text-[#6A2E18] font-medium text-[17px] leading-tight">
            {{ item.title }}
          </h3>
  
          <!-- Small Description -->
          <p class="text-xs text-[#6A2E18] text-[14px] mt-1">
            Premium human hair collection
          </p>
  
          <!-- Price -->
          <p class="text-[#6A2E18] font-medium text-[20px] mt-2">
            ${{ item.price }}
          </p>
  
          <!-- Add to Cart button -->
          <button
            class="mt-4 rounded-[10px] text-white text-sm font-medium w-full"
            style="
              height: 45px;
              background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%);
            "
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
          {
            id: 1,
            title: "Luxury 18” Body Wave Raw Hair",
            price: 299,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair3.png",
          },
          {
            id: 2,
            title: "Luxury 22” Loose Deepwave",
            price: 180,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair2.png",
          },
          {
            id: 3,
            title: "Luxury 6” Water Curly 13x4",
            price: 120,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair3.jpg",
          },
          {
            id: 4,
            title: "Luxury 22” Loose Deepwave",
            price: 180,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair4.png",
          },
          {
            id: 5,
            title: "Luxury 6” Water Curly 13”x4”",
            price: 120,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair4.png",
          },
          {
            id: 6,
            title: "Luxury 22” Loose Deepwave",
            price: 180,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair2.png",
          },
          {
            id: 7,
            title: "Luxury 18” Body Wave Raw Hair",
            price: 299,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair3.png",
          },
          {
            id: 3,
            title: "Luxury 6” Water Curly 13x4",
            price: 120,
            image: "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/Wigs/hair3.jpg",
          },
          // Add more items as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .filter-select {
    @apply bg-white border border-gray-300 text-black text-sm rounded-md py-2 px-3;
  }
  </style>
  