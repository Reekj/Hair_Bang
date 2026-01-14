<template>
  <div class="p-6 space-y-6">
    <!-- ADD / EDIT FORM -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-4">
        {{ editMode ? "Edit Product" : "Add New Product" }}
      </h2>

      <form @submit.prevent="editMode ? updateProduct() : addProduct()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <div>
            <label class="block font-semibold">Name</label>
            <input v-model="form.name" type="text" class="input" required />
          </div>

          <!-- Price -->
          <div>
            <label class="block font-semibold">Price</label>
            <input v-model.number="form.price" type="number" class="input" required />
          </div>

          <!-- Discount -->
          <div>
            <label class="block font-semibold">Discounted Price</label>
            <input
              v-model.number="form.discountedPrice"
              type="number"
              class="input"
              min="0"
            />
          </div>

          <!-- Length -->
          <div>
            <label class="block font-semibold">Length (inches)</label>
            <input
              v-model.number="form.length"
              type="number"
              class="input"
              placeholder="e.g. 12, 14, 16"
            />
          </div>

          <!-- Color -->
          <div>
            <label class="block font-semibold">Color</label>
            <input
              v-model="form.color"
              type="text"
              class="input"
              placeholder="Black, Brown, Blonde"
            />
          </div>

          <!-- Texture -->
          <div>
            <label class="block font-semibold">Texture</label>
            <select v-model="form.texture" class="input">
              <option value="">Select texture</option>
              <option value="straight">Straight</option>
              <option value="body wave">Body Wave</option>
              <option value="curly">Curly</option>
              <option value="deep wave">Deep Wave</option>
              <option value="water wave">Water Wave</option>
            </select>
          </div>

          <!-- Images -->
          <div>
            <label class="block font-semibold">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              class="input"
              @change="handleMultipleFiles"
            />
          </div>

          <!-- Quantity -->
          <div>
            <label class="block font-semibold">Quantity</label>
            <input v-model.number="form.quantity" type="number" min="0" class="input" />
          </div>

          <!-- Category -->
          <div>
            <label class="block font-semibold">Category</label>
            <select v-model="form.category" class="input" required>
              <option value="" disabled>Select category</option>
              <option v-for="c in categories" :key="c._id" :value="c._id">
                {{ c.name }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block font-semibold">Description</label>
            <textarea v-model="form.description" class="input" rows="3" />
          </div>
        </div>

        <div class="mt-4 flex gap-3">
          <button
            type="submit"
            :disabled="!isDiscountValid"
            class="btn-primary"
          >
            {{ editMode ? "Update" : "Add Product" }}
          </button>

          <button
            v-if="editMode"
            type="button"
            class="btn-secondary"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- PRODUCT TABLE -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Product List</h2>

      <table v-if="products.length" class="w-full border-collapse text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="th">Image</th>
            <th class="th">Name</th>
            <th class="th">Price</th>
            <th class="th">Length</th>
            <th class="th">Color</th>
            <th class="th">Texture</th>
            <th class="th">Qty</th>
            <th class="th">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in products" :key="p._id">
            <td class="td">
              <img :src="p.images[0]" class="h-12 w-12 object-cover rounded" />
            </td>
            <td class="td">{{ p.name }}</td>
            <td class="td">₦{{ p.price }}</td>
            <td class="td">{{ p.length || "-" }}</td>
            <td class="td capitalize">{{ p.color || "-" }}</td>
            <td class="td capitalize">{{ p.texture || "-" }}</td>
            <td class="td">{{ p.quantity }}</td>
            <td class="td space-x-2">
              <button class="btn-edit" @click="editProduct(p)">Edit</button>
              <button class="btn-delete" @click="deleteProduct(p._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-gray-500">No products found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { toast } from "../stores/toast";

const BASE_URL = "https://wig-api.onrender.com/api/products";

const products = ref([]);
const categories = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  price: null,
  discountedPrice: null,
  images: [],
  description: "",
  category: "",
  quantity: 0,
  length: null,
  color: "",
  texture: "",
});

const isDiscountValid = computed(() => {
  return (
    form.value.discountedPrice === null ||
    form.value.discountedPrice < form.value.price
  );
});

const loadProducts = async () => {
  const res = await axios.get(BASE_URL);
  products.value = res.data.products || res.data;
};

const loadCategories = async () => {
  const res = await axios.get("https://wig-api.onrender.com/api/categories");
  categories.value = res.data;
};

const addProduct = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/new`, form.value, {
    headers: { Authorization: `Bearer ${token}` },
  });
  products.value.unshift(res.data.product);
  toast.show("Product added", "success");
  resetForm();
};

const editProduct = (p) => {
  editMode.value = true;
  editingId.value = p._id;
  form.value = { ...p, category: p.category?._id };
};

const updateProduct = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BASE_URL}/${editingId.value}`, form.value, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const index = products.value.findIndex(p => p._id === editingId.value);
  products.value[index] = res.data.product;

  toast.show("Product updated", "success");
  cancelEdit();
};

const deleteProduct = async (id) => {
  if (!confirm("Delete product?")) return;
  const token = localStorage.getItem("token");
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  products.value = products.value.filter(p => p._id !== id);
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  resetForm();
};

const resetForm = () => {
  form.value = {
    name: "",
    price: null,
    discountedPrice: null,
    images: [],
    description: "",
    category: "",
    quantity: 0,
    length: null,
    color: "",
    texture: "",
  };
};

const handleMultipleFiles = async (e) => {
  const uploaded = [];
  for (const file of e.target.files) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "unsigned_upload");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/db0x4d6a8/image/upload",
      fd
    );
    uploaded.push(res.data.secure_url);
  }
  form.value.images = uploaded;
};

onMounted(loadProducts);
onMounted(loadCategories);
</script>

<style>
.input { @apply w-full border p-2 rounded; }
.th { @apply border p-2 font-semibold; }
.td { @apply border p-2; }
.btn-primary { @apply bg-blue-600 text-white px-4 py-2 rounded; }
.btn-secondary { @apply bg-gray-500 text-white px-4 py-2 rounded; }
.btn-edit { @apply bg-yellow-500 text-white px-2 py-1 rounded; }
.btn-delete { @apply bg-red-600 text-white px-2 py-1 rounded; }
</style>
