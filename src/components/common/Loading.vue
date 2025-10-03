<template>
  <div class="flex flex-col justify-center items-center text-center h-64 space-y-4">
    <img
      :src="flowerImage"
      alt="Loading flower"
      class="w-28 h-28"
    />
    <p class=" font-bold text-sky-700 text-sm animate-pulse">
      Loading...
    </p>
  </div>
</template>

<script setup>
import flowerImage from '../../assets/images/Loading-PS-render-80x80px.gif'
</script>

<style scoped>
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

.filter-blue {
  filter: brightness(10%) saturate(250%) invert(15%) sepia(90%) saturate(2000%) hue-rotate(200deg) brightness(85%) contrast(130%);
}

/* .filter-red {
  filter: brightness(10%) saturate(250%) invert(15%) sepia(90%) saturate(2000%) hue-rotate(0deg) brightness(85%) contrast(130%);
} */

@keyframes pulse-rotate {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(180deg);
  }
}

.animate-pulse-rotate {
  animation: pulse-rotate 2s ease-in-out infinite;
}

</style>
