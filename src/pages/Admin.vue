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

          <div class="md:col-span-2">
            <label class="block font-semibold">Product Image</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full border p-2 rounded"
              accept="image/*"
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
            <label class="block font-semibold">Category</label>
            <select
              v-model="form.category"
              class="w-full border p-2 rounded"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-4 flex gap-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
            <th class="border p-2">Description</th>
            <th class="border p-2">Category</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in products" :key="p._id">
            <td class="border p-2">
              <img :src="p.image" class="h-16 w-16 object-cover rounded" />
            </td>
            <td class="border p-2">{{ p.name }}</td>
            <td class="border p-2">₦{{ p.price }}</td>
            <td class="border p-2">{{ p.description }}</td>
            <td class="border p-2">{{ p.category }}</td>
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
import { ref, onMounted } from "vue";
import axios from "axios";

// API URLS
const BASE_URL = "https://wig-api.onrender.com/api/products";

// States
const products = ref([]);
const loading = ref(false);
const error = ref(null);
const editMode = ref(false);
const editingId = ref(null);
const categories = ["Wigs", "Jeans", "Hair Accessories"];

// Form state
const form = ref({
  name: "",
  price: "",
  image: "",
  description: "",
  category: "",
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
    resetForm();
  } catch (err) {
    alert("Failed to add product");
  }
};

// Fill form for editing
const editProduct = (p) => {
  editMode.value = true;
  editingId.value = p._id;
  form.value = { ...p };
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
  } catch (err) {
    alert("Failed to update product");
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
  } catch (err) {
    alert("Failed to delete product");
  }
};

// Reset form
const resetForm = () => {
  form.value = {
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  };
};
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); // replace
  formData.append("cloud_name", "db0x4d6a8"); // replace

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/db0x4d6a8/image/upload",
      formData
    );

    form.value.image = res.data.secure_url; // auto-fill image URL
  } catch (err) {
    alert("Image upload failed");
  }
};

onMounted(loadProducts);
</script>

<style>
/* optional clean styling */
</style>
