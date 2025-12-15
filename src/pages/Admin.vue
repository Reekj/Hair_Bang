<template>
  <div class="p-6 space-y-6">
    <!-- ADD / EDIT FORM -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-4">
        {{ editMode ? "Edit Product" : "Add New Product" }}
      </h2>

      <form @submit.prevent="editMode ? updateProduct() : addProduct()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label class="block font-semibold">Price</label>
            <input
              v-model.number="form.price"
              type="number"
              class="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label class="block font-semibold"
              >Discounted Price (optional)</label
            >
            <input
              v-model.number="form.discountedPrice"
              type="number"
              class="w-full border p-2 rounded"
              min="0"
            />
          </div>

          <div>
            <label class="block font-semibold">Product Image</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full border p-2 rounded"
              accept="image/*"
              multiple
            />
          </div>

          <div class="md:col-span-2">
            <label class="block font-semibold">Description</label>
            <textarea
              v-model="form.description"
              class="w-full border p-2 rounded"
              required
            ></textarea>
          </div>

          <div>
            <label class="block font-semibold">Quantity</label>
            <input
              v-model.number="form.quantity"
              type="number"
              class="w-full border p-2 rounded"
              min="0"
              required
            />
          </div>

          <div>
            <label class="block font-semibold">Category</label>
            <select
              v-model="form.category"
              class="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                {{ cat.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-4 flex gap-4">
          <button
            type="submit"
            :disabled="!isDiscountValid"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {{ editMode ? "Update" : "Add Product" }}
          </button>

          <button
            v-if="editMode"
            @click="cancelEdit"
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- PRODUCT TABLE -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Product List</h2>

      <div v-if="loading">Loading products...</div>
      <div v-if="error" class="text-red-600">{{ error }}</div>

      <table v-if="products.length" class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Image</th>
            <th class="border p-2">Name</th>
            <th class="border p-2">Price</th>
            <th class="border p-2">Discounted Price</th>
            <th class="border p-2">Description</th>
            <th class="border p-2">Category</th>
            <th class="border p-2">Stock</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in products" :key="p._id">
            <td class="border p-2">
              <img :src="p.images[0]" class="h-16 w-16 object-cover rounded" />
            </td>
            <td class="border p-2">{{ p.name }}</td>
            <td class="border p-2">₦{{ p.price }}</td>
            <td class="border p-2">
              <div v-if="p.discountedPrice !== null">
                <span class="line-through text-gray-400"> ₦{{ p.price }} </span>
                <br />
                <span class="text-green-600 font-bold">
                  ₦{{ p.discountedPrice }}
                </span>
                <span class="text-xs text-red-600 font-semibold">
                  {{
                    Math.round(((p.price - p.discountedPrice) / p.price) * 100)
                  }}% OFF
                </span>
              </div>
              <span v-else>₦{{ p.price }}</span>
            </td>

            <td class="border p-2">{{ p.description }}</td>
            <td class="border p-2">
              {{ p.category?.name || "No Category" }}
            </td>
            <td class="border p-2">
              <span class="font-semibold">Qty: {{ p.quantity }}</span
              ><br />
              <span
                :class="{
                  'text-green-600': p.status === 'in stock',
                  'text-yellow-600': p.status === 'low stock',
                  'text-red-600': p.status === 'out of stock',
                  'font-semibold': true,
                }"
              >
                {{ p.status }}
              </span>
            </td>

            <td class="border p-2 space-x-2">
              <button
                @click="editProduct(p)"
                class="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(p._id)"
                class="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-gray-500">No products available.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { toast } from "../stores/toast";

// API URLS
const BASE_URL = "https://wig-api.onrender.com/api/products";

// States
const products = ref([]);
const loading = ref(false);
const error = ref(null);
const editMode = ref(false);
const editingId = ref(null);
const categories = ref([]);

// Form state
const form = ref({
  name: "",
  price: "",
  discountedPrice: null,
  image: [],
  description: "",
  category: "",
  quantity: 0,
});

const isDiscountValid = computed(() => {
  return (
    form.value.discountedPrice === null ||
    form.value.discountedPrice < form.value.price
  );
});

// Load products
const loadProducts = async () => {
  loading.value = true;
  try {
    const res = await axios.get(BASE_URL);
    products.value = res.data;
  } catch (err) {
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
};

const loadCategories = async () => {
  try {
    const res = await axios.get("https://wig-api.onrender.com/api/categories");
    categories.value = res.data; // must return [{ _id, name, slug }]
  } catch (err) {
    console.error("Failed to load categories");
  }
};

// Add product
const addProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${BASE_URL}/new`, form.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    products.value.push(res.data.product); // Add newly created item with _id
    toast.show("Product added successfully", "success");
    resetForm();
  } catch (err) {
    alert("Failed to add product");
  }
};

// Fill form for editing
const editProduct = (p) => {
  editMode.value = true;
  editingId.value = p._id;
  form.value = {
    name: p.name,
    price: p.price,
    discountedPrice: p.discountedPrice ?? null,
    image: p.image,
    description: p.description,
    category: p.category?._id || "",
    quantity: p.quantity || 0,
  };
};

// Cancel editing
const cancelEdit = () => {
  resetForm();
  editMode.value = false;
  editingId.value = null;
};

// Update product
const updateProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${BASE_URL}/${editingId.value}`, form.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update list
    const index = products.value.findIndex((p) => p._id === editingId.value);
    if (index !== -1) products.value[index] = res.data.product;

    cancelEdit();
    toast.show("Product updated successfully", "success");
  } catch (err) {
    toast.show("Failed to update product", "error");
  }
};

// Delete product
const deleteProduct = async (id) => {
  if (!confirm("Delete this product?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    products.value = products.value.filter((p) => p._id !== id);
    toast.show("Product deleted successfully", "success");
  } catch (err) {
    toast.show("Failed to delete product", "error");
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    name: "",
    price: "",
    discountedPrice: null,
    image: "",
    description: "",
    category: "",
    quantity: 0,
  };
};
const handleMultipleFiles = async (event) => {
  const files = Array.from(event.target.files);
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");
    formData.append("cloud_name", "db0x4d6a8");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/db0x4d6a8/image/upload",
        formData
      );
      uploadedUrls.push(res.data.secure_url);
    } catch (err) {
      toast.show("Image upload failed for one of the files", "error");
    }
  }

  form.value.images = uploadedUrls; // save all uploaded URLs
};



onMounted(loadProducts);
onMounted(loadCategories);
</script>

<style>
/* optional clean styling */
</style>
