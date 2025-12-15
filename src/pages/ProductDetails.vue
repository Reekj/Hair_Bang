<template>
  <div class="w-full bg-[#F7EDE5] py-10 px-4 sm:px-6 lg:px-8">
    <!-- MAIN GRID -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- LEFT: MAIN IMAGE + THUMBS -->
      <div>
        <div
          class="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[854px] bg-white rounded-xl overflow-hidden shadow"
        >
          <img
            :src="product.images?.[0] || 'https://via.placeholder.com/600x800'"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex gap-4 mt-4 overflow-x-auto">
          <img
            v-for="img in product.images"
            :key="img"
            :src="img"
            class="w-[120px] sm:w-[140px] md:w-[156px] h-[150px] sm:h-[180px] md:h-[195px] rounded-lg object-cover cursor-pointer border border-gray-300 flex-shrink-0"
          />
        </div>
      </div>

      <!-- RIGHT: DETAILS -->
      <div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl text-[#6A2E18] font-medium">
          {{ product.title }}
        </h1>

        <div class="flex gap-[290px] flex-row">
          <p class="text-2xl sm:text-3xl text-[#6A2E18] font-normal mt-2">
            ${{ product.price }}
          </p>
          <div class="flex justify-end gap-4 items-right mt-1">
            <p class="text-[#6A2E18] flex justify-end font-normal">5.0</p>
            <span class="text-[#6A2E18]">★★★★★</span>
          </div>
        </div>

        <ul
          class="mt-4 text-[#6A2E18] space-y-2 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          <li v-for="(line, index) in product.description" :key="index">
            • {{ line }}
          </li>
        </ul>

        <!-- QUANTITY -->
        <div class="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <p class="text-[#6A2E18] font-medium text-lg sm:text-xl md:text-2xl">
            Quantity :
          </p>
          <div class="flex items-center gap-4 flex-wrap">
            <div
              class="w-full sm:w-[200px] md:w-[250px] lg:w-[322px] h-14 sm:h-[70px] md:h-[85px] flex items-center justify-between border border-gray-400 rounded-full px-4 sm:px-6"
            >
              <button
                @click="decreaseQty"
                class="text-2xl sm:text-3xl font-normal"
              >
                −
              </button>
              <p
                class="text-xl sm:text-2xl md:text-3xl font-semibold text-center w-full"
              >
                {{ qty }}
              </p>
              <button
                @click="increaseQty"
                class="text-2xl sm:text-3xl font-normal"
              >
                +
              </button>
            </div>

            <div class="flex gap-3">
              <span
                v-for="color in product.colors"
                :key="color"
                :style="{ backgroundColor: color }"
                class="w-4 h-4 rounded-full cursor-pointer"
              ></span>
            </div>
          </div>
        </div>

        <!-- ADD TO CART + HEART -->
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            @click="addToCart"
            class="flex-1 h-12 sm:h-14 rounded-xl text-white font-medium text-lg sm:text-xl"
            style="background: linear-gradient(90deg, #b13f32 0%, #4b1b15 100%)"
          >
            Add To Cart
          </button>

          <button
            class="w-12 h-12 flex items-center justify-center rounded-xl border border-[#6A2E18]"
          >
            <img
              src="https://dkcxshokjuwsqtuaycry.supabase.co/storage/v1/object/public/Car_Rankings_Data/hhb_images/misc/mdi-light_heart.png"
              class="w-6"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- REVIEWS SECTION -->
    <div class="max-w-[1060px] w-full mx-[80px] mt-16">
      <h2 class="text-2xl sm:text-3xl text-[#6A2E18] font-semibold">Reviews</h2>
      <p class="text-[#6A2E18] opacity-80 mb-6">{{ reviews.length }} reviews</p>
      <div class="flex flex-col space-y-6">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="bg-none rounded-xl p-6 w-full"
        >
          <p class="text-[#6A2E18] font-medium text-[28px] sm:text-xl mb-2">
            ★★★★★
          </p>
          <p
            class="text-[#6A2E18] text-[28px] sm:text-base leading-relaxed font-medium"
          >
            {{ review }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ProductDetails",

  setup() {
    const route = useRoute();
    const productId = route.params.id; // get product ID from URL
    const qty = ref(1);
    const product = ref({
      title: "",
      price: 0,
      image: "",
      images: [],
      description: [],
      colors: ["#000000", "#7A1F1F", "#D4A373"], // default colors
    });
    const reviews = ref([]);

    // Fetch product data dynamically
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://wig-api.onrender.com/api/products/${productId}`
        );
        const data = res.data.product || res.data;
        product.value = {
          title: data.name,
          price: data.price,
          images:
            data.images && data.images.length ? data.images : [data.image],
          description: Array.isArray(data.description)
            ? data.description
            : [data.description || ""],
          colors: data.colors || ["#000000", "#7A1F1F", "#D4A373"],
        };

        reviews.value = data.reviews || [];
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    const increaseQty = () => {
      qty.value++;
    };
    const decreaseQty = () => {
      if (qty.value > 1) qty.value--;
    };

    const addToCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in to add items to your cart.");
          return;
        }

        await axios.post(
          "https://wig-api.onrender.com/api/cart/add",
          { productId, quantity: qty.value },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Added to cart successfully!");
        window.dispatchEvent(new Event("cart-updated"));
      } catch (err) {
        console.error(err);
        alert("Failed to add to cart.");
      }
    };

    onMounted(fetchProduct);

    return {
      product,
      reviews,
      qty,
      increaseQty,
      decreaseQty,
      addToCart,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
