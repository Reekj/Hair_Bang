<template>
  <div class="w-full bg-[#F7EDE5] pb-20 min-h-screen">

    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6A2E18] font-semibold text-center">
        Your Cart
      </h1>
    </section>

    <!-- Cart Items -->
    <section
      v-if="cartItems.length"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      <div
        v-for="item in cartItems"
        :key="item._id"
        class="bg-white rounded-xl shadow-sm flex flex-col p-2"
      >
        <!-- Image -->
        <div class="relative w-full h-64 sm:h-72 md:h-80 mb-4">
          <img :src="item.product.image" class="w-full h-full object-cover rounded-xl" />
        </div>

        <!-- Name -->
        <h3 class="text-[#6A2E18] font-medium text-base sm:text-[17px] md:text-lg leading-snug px-4">
          {{ item.product.name }}
        </h3>

        <!-- Price -->
        <p class="text-[#6A2E18] font-medium text-lg sm:text-[20px] mt-2 px-4">
          ₦{{ (item.product.price * item.quantity).toLocaleString() }}
        </p>

        <!-- Quantity Controls -->
        <div class="flex items-center justify-center gap-3 mt-2 px-4">
          <button
            @click="updateQuantity(item.product._id, item.quantity - 1)"
            class="px-3 py-1 bg-gray-300 rounded-md text-[#6A2E18] font-semibold"
          >-</button>

          <span>{{ item.quantity }}</span>

          <button
            @click="updateQuantity(item.product._id, item.quantity + 1)"
            class="px-3 py-1 bg-gray-300 rounded-md text-[#6A2E18] font-semibold"
          >+</button>
        </div>

        <!-- Remove Button -->
        <button
          @click="removeFromCart(item.product._id)"
          class="mt-auto mx-4 mb-4 rounded-xl text-white text-sm sm:text-base font-medium h-10 sm:h-12 w-auto"
          style="background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%)"
        >
          Remove
        </button>
      </div>
    </section>

    <!-- Empty Cart -->
    <div v-else class="text-center text-[#6A2E18] mt-20 text-lg">
      Your cart is empty.
    </div>

    <!-- Cart Summary & Checkout -->
    <div
      v-if="cartItems.length"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <p class="text-[#6A2E18] font-semibold text-lg">
        Total: ₦{{ totalPrice.toLocaleString() }}
      </p>

      <button
        @click="checkout"
        class="px-6 py-3 rounded-xl text-white font-medium"
        style="background: linear-gradient(90deg, #B13F32 0%, #4B1B15 100%)"
      >
        Checkout
      </button>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";

export default {
  name: "Cart",
  setup() {
    const cartItems = ref([]);
    const token = localStorage.getItem("token");

    /** ----------------------------
     * FETCH CART (safe parsing)
     ----------------------------- */
    const fetchCart = async () => {
      if (!token) return;

      try {
        const res = await axios.get("https://wig-api.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("RAW CART RESPONSE:", res.data);

        let raw = [];

        if (Array.isArray(res.data)) raw = res.data;
        else if (Array.isArray(res.data.cart)) raw = res.data.cart;
        else if (Array.isArray(res.data.items)) raw = res.data.items;
        else if (Array.isArray(res.data.cartItems)) raw = res.data.cartItems;

        // Filter out invalid/null product entries
        cartItems.value = raw
          .filter(item => item && item.productId && item.productId._id)
          .map(item => ({
            _id: item._id,
            quantity: item.quantity ?? 1,
            product: item.productId
          }));

      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    /** ----------------------------
     * UPDATE QUANTITY
     ----------------------------- */
    const updateQuantity = async (productId, newQuantity) => {
      if (newQuantity < 1) return;

      try {
        await axios.put(
          "https://wig-api.onrender.com/api/cart/update",
          { productId, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const item = cartItems.value.find(i => i.product._id === productId);
        if (item) item.quantity = newQuantity;
      } catch (err) {
        console.error("Failed to update quantity:", err);
        alert("Could not update quantity.");
      }
    };

    /** ----------------------------
     * REMOVE ITEM
     ----------------------------- */
    const removeFromCart = async (productId) => {
      try {
        await axios.delete(
          `https://wig-api.onrender.com/api/cart/remove/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        cartItems.value = cartItems.value.filter(i => i.product._id !== productId);
      } catch (err) {
        console.error("Failed to remove item:", err);
        alert("Could not remove item.");
      }
    };

    /** ----------------------------
     * TOTAL PRICE
     ----------------------------- */
    const totalPrice = computed(() =>
      cartItems.value.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      )
    );

    /** ----------------------------
     * CHECKOUT
     ----------------------------- */
    const checkout = () => {
      if (!cartItems.value.length) return alert("Your cart is empty.");
      alert(`Proceed to checkout — Total: ₦${totalPrice.value.toLocaleString()}`);
    };

    /** ----------------------------
     * LISTEN FOR CART UPDATES
     ----------------------------- */
    window.addEventListener("cart-updated", fetchCart);

    onMounted(fetchCart);

    onBeforeUnmount(() => {
      window.removeEventListener("cart-updated", fetchCart);
    });

    return {
      cartItems,
      updateQuantity,
      removeFromCart,
      totalPrice,
      checkout
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
``