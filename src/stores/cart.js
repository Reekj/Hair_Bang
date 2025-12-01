import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([]) // user-specific cart

  const addItem = (product) => items.value.push(product)
  const removeItem = (index) => items.value.splice(index, 1)
  const clearCart = () => items.value = []

  return { items, addItem, removeItem, clearCart }
})
