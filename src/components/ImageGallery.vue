<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 h-auto min-h-96">
    <img
      v-for="(image, index) in imageList"
      :key="index"
      :src="image"
      class="rounded shadow w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
      @click="openLightbox(index)"
    />
    
    <img
      v-if="imageList.length === 0"
      :src="defaultImage"
      class="rounded shadow w-full h-48 object-cover"
    />
  </div>
  
  <!-- Lightbox สำหรับแสดงรูปภาพเต็มหน้าจอ -->
  <div v-if="showLightbox" class="fixed inset-0 bg-black/90 flex items-center justify-center z-50" @click.self="closeLightbox">
    <div class="relative max-w-4xl w-full p-4">
      <button 
        @click="closeLightbox" 
        class="absolute top-1 right-4 text-white text-3xl z-10 hover:text-gray-300 transition"
      >
        &times;
      </button>
      <img 
        :src="imageList[currentImageIndex]" 
        class="max-h-[80vh] mx-auto rounded-lg shadow-xl"
      />
      <div class="flex justify-center mt-4">
        <button 
          @click="prevImage" 
          class="text-white text-xs bg-blue-900 px-4 py-1 rounded hover:bg-blue-800 transition"
        >
          ← Previous
        </button>
        <span class="text-white self-center mx-10">
          {{ currentImageIndex + 1 }} / {{ imageList.length }}
        </span>
        <button 
          @click="nextImage" 
          class="text-white text-xs bg-blue-900 px-4 py-1 rounded hover:bg-blue-800 transition"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getDefaultImage } from '../utils/getImage';

const props = defineProps({
  detailImages: {
    type: Array,
    default: () => []
  }
});

const defaultImage = getDefaultImage();
const showLightbox = ref(false);
const currentImageIndex = ref(0);

const imageList = computed(() => {
  return props.detailImages.length > 0 ? props.detailImages : [defaultImage];
});

const openLightbox = (index) => {
  currentImageIndex.value = index;
  showLightbox.value = true;
};

const closeLightbox = () => {
  showLightbox.value = false;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % imageList.value.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + imageList.value.length) % imageList.value.length;
};
</script>

<style scoped>
img {
  transition: transform 0.2s;
}
img:hover {
  transform: scale(1.02);
}
</style>