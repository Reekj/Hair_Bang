<template>
  <transition name="fade">
    <div v-if="toast.visible" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { toast } from "../stores/toast.js";
</script>

<style scoped>
.toast {
  position: fixed;
  top: 25px;
  right: 25px;
  padding: 14px 20px;
  color: #fff;
  border-radius: 8px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.success {
  background: #16a34a;
}
.error {
  background: #dc2626;
}
.info {
  background: #2563eb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
