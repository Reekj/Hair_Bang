<template>
    <img
      :src="observerLoaded ? src : placeholder"
      :alt="alt"
      :class="['transition-opacity duration-700 ease-out', observerLoaded ? 'opacity-100' : 'opacity-0']"
      loading="lazy"
      ref="imgRef"
    />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    placeholder: {
      type: String,
      default:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==' // tiny transparent pixel
    }
  })
  
  const imgRef = ref(null)
  const observerLoaded = ref(false)
  
  onMounted(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          observerLoaded.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
  
    if (imgRef.value) {
      observer.observe(imgRef.value)
    }
  })
  </script>
  
  <style scoped>
  img {
    width: 100%;
    display: block;
  }
  </style>
  