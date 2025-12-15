<template>
    <div class="w-full bg-[#F7EDE5] pb-20 min-h-screen relative">
  
      <!-- Header Section -->
      <section class="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl text-[#6A2E18] font-semibold">
          Head Size Guide
        </h1>
        <p class="text-[#6A2E18] mt-2 opacity-80">
          Find your perfect fit for wigs, hats, and headwear
        </p>
  
        <!-- Quick Links -->
        <div class="mt-6 flex justify-center gap-4 flex-wrap">
          <button @click="scrollToSection('guide')" class="bg-[#B13F32] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            How to Measure
          </button>
          <button @click="scrollToSection('chart')" class="bg-[#B13F32] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            Size Chart
          </button>
          <button @click="scrollToSection('faq')" class="bg-[#B13F32] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            FAQ
          </button>
        </div>
      </section>
  
      <!-- Guide Section -->
      <section ref="guide" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-12">
        <div class="w-full flex justify-center">
          <img 
            src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/head_size_diagram.png"
            alt="Head measurement diagram"
            class="w-full max-w-md rounded-xl shadow-md hover:scale-105 transition-transform"
          />
        </div>
  
        <div class="flex flex-col gap-6">
          <h2 class="text-xl sm:text-2xl font-semibold text-[#6A2E18]">How to Measure Your Head</h2>
          <ol class="list-decimal list-inside text-[#6A2E18] text-sm sm:text-base space-y-1">
            <li>Use a soft measuring tape.</li>
            <li>Wrap the tape around your head, about 1 inch above your eyebrows and ears.</li>
            <li>Ensure the tape is snug but not tight.</li>
            <li>Note the measurement in centimeters or inches.</li>
            <li>Compare your measurement to our size chart below.</li>
          </ol>
        </div>
      </section>
  
      <!-- Size Chart Section -->
      <section ref="chart" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h3 class="text-lg sm:text-xl font-medium text-[#6A2E18] mb-4">Size Chart</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-xl shadow-md text-[#6A2E18]">
            <thead>
              <tr class="bg-[#E6D6C9]">
                <th class="py-2 px-4 text-left">Size</th>
                <th class="py-2 px-4 text-left">Head Circumference (cm)</th>
                <th class="py-2 px-4 text-left">Head Circumference (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-gray-200 hover:bg-[#FDE8E0] transition">
                <td class="py-2 px-4">Small</td>
                <td class="py-2 px-4">52-54</td>
                <td class="py-2 px-4">20.5-21.3</td>
              </tr>
              <tr class="border-t border-gray-200 hover:bg-[#FDE8E0] transition">
                <td class="py-2 px-4">Medium</td>
                <td class="py-2 px-4">55-57</td>
                <td class="py-2 px-4">21.7-22.4</td>
              </tr>
              <tr class="border-t border-gray-200 hover:bg-[#FDE8E0] transition">
                <td class="py-2 px-4">Large</td>
                <td class="py-2 px-4">58-60</td>
                <td class="py-2 px-4">22.8-23.6</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="mt-6 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
          <h4 class="text-lg font-semibold text-[#6A2E18] mb-4">Interactive Head Size Finder</h4>
          <p class="text-[#6A2E18] mb-4">Enter your head measurement to find your recommended size:</p>
          
          <div class="flex gap-2 items-center mb-4">
            <input 
              type="number"
              v-model.number="measurement"
              placeholder="Enter measurement"
              class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B13F32]"
            />
            <select v-model="unit" class="border border-gray-300 rounded-md py-2 px-3 text-sm">
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
  
          <div v-if="recommendedSize" class="text-[#B13F32] font-semibold text-center text-lg">
            Recommended Size: {{ recommendedSize }}
          </div>
        </div>
  
      </section>
  
      <!-- FAQ Section -->
      <section ref="faq" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 class="text-2xl sm:text-3xl font-semibold text-[#6A2E18] text-center mb-6">Frequently Asked Questions</h2>
  
        <div class="space-y-4">
          <div v-for="(item, index) in faqs" :key="index" class="bg-white rounded-xl shadow-md p-4 cursor-pointer" @click="toggleFAQ(index)">
            <h3 class="font-medium text-[#6A2E18] flex justify-between items-center">
              {{ item.q }}
              <span>{{ activeFAQ === index ? "-" : "+" }}</span>
            </h3>
            <p v-if="activeFAQ === index" class="text-[#6A2E18] mt-2">{{ item.a }}</p>
          </div>
        </div>
      </section>
  
      <!-- Floating Back to Products Button -->
      <router-link
        to="/wigs"
        class="fixed bottom-6 right-6 bg-gradient-to-r from-[#B13F32] to-[#4B1B15] text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition"
      >
        ← Back to Products
      </router-link>
  
    </div>
  </template>
  
  <script>
  export default {
    name: "HeadSizeGuidePage",
    data() {
      return {
        faqs: [
          {
            q: "What if my head measurement is between two sizes?",
            a: "We recommend choosing the larger size for comfort."
          },
          {
            q: "Can I use a regular ruler?",
            a: "A soft measuring tape is best. A ruler won’t wrap around your head accurately."
          },
          {
            q: "Will hair affect my measurement?",
            a: "Measure over your hair if wearing wigs, otherwise measure on bare head for accuracy."
          }
        ],
        activeFAQ: null,
        measurement: null,
        unit: "cm"
      };
    },
    computed: {
      recommendedSize() {
        if (!this.measurement) return null;
  
        let cm = this.unit === "in" ? this.measurement * 2.54 : this.measurement;
  
        if (cm >= 52 && cm <= 54) return "Small";
        if (cm >= 55 && cm <= 57) return "Medium";
        if (cm >= 58 && cm <= 60) return "Large";
        return "Custom / Check size chart";
      }
    },
    methods: {
      toggleFAQ(index) {
        this.activeFAQ = this.activeFAQ === index ? null : index;
      },
      scrollToSection(refName) {
        const el = this.$refs[refName];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  </script>
  
  <style scoped>
  * {
    max-width: 100%;
    box-sizing: border-box;
  }
  </style>
  