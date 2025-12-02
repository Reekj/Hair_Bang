<template>
    <div class="w-full flex flex-col items-center">
  
      <!-- HERO SECTION -->
      <section
  class="w-full bg-[#F6E7DF] border-b pt-[70px] pb-[70px] flex justify-center relative"
>
  <div class="max-w-[1440px] w-full flex flex-col lg:flex-row items-center justify-between px-6 gap-[59px] relative">

    <!-- LEFT TEXT BLOCK -->
    <div class="max-w-[597px] space-y-10 order-1 lg:order-1">
      <h1 class="text-[48px] font-semibold leading-tight text-[#6A2E18] leading-loose">
        Elevate Your Style with <br /> Premium Fashion
      </h1>

      <p class="text-[20px] leading-relaxed text-[#5B4A45] ">
        Discover our curated collection of luxury wigs, sophisticated
        hair accessories, and premium denim crafted for the modern
        individual.
      </p>

      <button
        class="h-[66px] w-[228px] mt-2 bg-[#B15C32] text-[20px] text-white text-semibold px-[34px] py-[17px] rounded-xl font-medium hover:bg-[#582614] transition"
      >
        Shop Collection
      </button>
    </div>

    <!-- RIGHT: CAROUSEL -->
    <div class="w-full max-w-[602px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[602px] aspect-[1/1] overflow-hidden relative border border-gray-300 rounded-md mt-8 lg:mt-0 order-0 lg:order-2">
      
      <div class="flex transition-transform duration-700" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(img, index) in images" :key="index" class="flex-shrink-0 w-full h-full">
          <LazyImage
            :src="img"
            alt="Hero Wig"
            class="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      <!-- DOTS -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <span
          v-for="(img, i) in images"
          :key="i"
          @click="currentIndex = i"
          class="w-3 h-3 rounded-full cursor-pointer transition"
          :class="currentIndex === i ? 'bg-[#B15C32]' : 'bg-white/60'"
        ></span>
      </div>
    </div>

  </div>
</section>


  
      <!-- OUR COLLECTIONS SECTION -->
      <section class="w-full bg-[#F6E7DF] pt-[70px] pb-[70px] flex justify-center">
        <div class="max-w-[1440px] w-full px-6 flex flex-col items-center gap-10">
  
          <!-- Title -->
          <div class="flex flex-col items-center">
            <h2 class="text-[40px] font-semibold text-[#6A2E18]">
              Our Collections
            </h2>
            <p class="text-[20px] text-[#5B4A45] mt-1">
              Three distinct categories, one unified vision of luxury
            </p>
          </div>
  
          <!-- COLLECTION IMAGES -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
  
            <!-- 1. Wigs -->
            <div class="flex justify-center">
              <LazyImage
                src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/watercurlhair.png"
                alt="Wig Collection"
                class="w-[403px] h-[499px] object-cover rounded-md shadow-md"
              />
            </div>
  
            <!-- 2. Hair accessories -->
            <div class="flex justify-center">
              <LazyImage
                src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/accessory1.png"
                alt="Hair Accessories"
                class="w-[403px] h-[499px] object-cover rounded-md shadow-md"
              />
            </div>
  
            <!-- 3. Jeans -->
            <div class="flex justify-center">
              <LazyImage
                src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/jean1.png"
                alt="Jeans Collection"
                class="w-[403px] h-[499px] object-cover rounded-md shadow-md"
              />
            </div>
  
          </div>
  
        </div>
      </section>

      <section className="max-w-8xl mx-auto py-20 px-6">


        <h2 className="text-center text-3xl font-semibold text-[#4A2C28]">
        Featured Products
        </h2>
        <p className="text-center text-[#7A5F58] mt-2">
        Handpicked selections from our premium collections
        </p>


        <<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[27px] mt-12">

        <div className="w-[340px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 px-[20px] py-[20px] ">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair3.png"
            className="w-auto h-[384px] object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-[18px] font-normal text-[#4A2C28] mb-[8px]">
              Luxury 16 Body wave Raw Hair
            </h3>
            <p className="text-[14px] text-[#6A2E18] mb-[18px]">
              Premium human hair collection
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-[#4A2C28] text-[20px]">$299</span>
              <button className="bg-gradient-to-r from-[#B13F32] to-[#4B1B15] text-white text-xs text-[18px] rounded-md py-2 px-4 transition w-[143px] h-[45px]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="w-[340px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 px-[25px] py-[20px]">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/hairaccecories1.png"
            className="w-auto h-[384px] object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-[18px] font-medium text-[#4A2C28] mb-[8px]">
              Vent Hair Brush
            </h3>
            <p className="text-[14px] text-[#6A2E18] mb-[18px]">
              Premium hair care essentials
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-[#6A2E18] text-[20px]">$9.2</span>
              <button className="bg-gradient-to-r from-[#B13F32] to-[#4B1B15] text-white text-[18px] text-xs rounded-md py-2 px-4 transition w-[143px] h-[45px]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="w-[340px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 px-[25px] py-[20px]">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair1.png"
            className="w-auto h-[384px] object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-[18px] font-medium text-[#4A2C28] mb-[8px]">
              18” Ashblonde Bodywave
            </h3>
            <p className="text-[14px] text-[#6A2E18] mb-[18px]">
              Premium human hair collection
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-[#6A2E18] text-[20px]">$300</span>
              <button className="bg-gradient-to-r from-[#B13F32] to-[#4B1B15] text-white text-[18px] text-xs rounded-md py-2 px-4 transition w-[143px] h-[45px]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="w-[340px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 px-[25px] py-[20px]">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/homepagehair2.png"
            className="w-auto h-[384px] object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-[18px] font-medium text-[#4A2C28] mb-[8px]">
              14” Kinky Straight 7×5 Hair
            </h3>
            <p className="text-[14px] text-[#6A2E18] mb-[18px]">
              Premium human hair collection
            </p>

            <div className="flex items-center justify-between mt-4">
              <span className="font-medium text-[#6A2E18] text-[20px]">$299</span>
              <button className="bg-gradient-to-r from-[#B13F32] to-[#4B1B15] text-white text-xs text-[18px] rounded-md py-2 px-4 transition w-[143px] h-[45px]">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

</div>

      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">

      <h2 className="text-center text-3xl font-semibold text-[#4A2C28]">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-16 ">


        <div className="flex flex-col items-center text-center">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/customer1.jpg"
            className="w-[149px] h-[159px] rounded-full object-cover mb-[15px]"
          />
          <div class="flex space-x-1">
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
          </div>

          <p className="text-[18px] text-[#6A2E18] mt-3 font-normal max-w-xs">
            “The quality is exceptional. My wig looks and feels incredibly natural.”
          </p>
          <p className="text-[18px] font-medium mt-[20px] text-[#6A2E18]">Sandra Jackson</p>
        </div>


        <div className="flex flex-col items-center text-center">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/customer2.jpg"
            className="w-[149px] h-[159px] rounded-full object-cover mb-[15px]"
          />
          <div class="flex space-x-1">
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
          </div>
          <p className="text-[18px] text-[#6A2E18] mt-3 font-normal max-w-xs">
            “Beautiful hair accessories that elevate any outfit effortlessly.”
          </p>
          <p className="text-[18px] font-medium mt-[20px] text-[#6A2E18]">Alexandra Smith</p>
        </div>


        <div className="flex flex-col items-center text-center">
          <img
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/customer3.jpg"
            className="w-[149px] h-[159px] rounded-full object-cover mb-[15px]"
          />
          <div class="flex space-x-1">
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
            <span class="text-xl font-bold bg-gradient-to-r from-[#030303] to-[#8E4728] bg-clip-text text-transparent">★</span>
          </div>
          <p className="text-[18px] text-[#6A2E18] mt-3 font-normal max-w-[900px]">
            “Perfect fit and amazing quality. Worth every penny.”
          </p>
          <p className="text-[18px] font-medium mt-[20px] text-[#6A2E18]">Alen Chen</p>
        </div>

      </div>
    </section>
  
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'

const images = [
  "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/heroimg.jpg",
  "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/dummywig1.jpeg",
  "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/dummywig2.jpeg",
  "https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/dummywig3.jpeg"
]

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 4000) // auto-slide every 4s
})
</script>

  