<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisible: {
    type: Number,
    default: 7 // จำนวนตัวเลขที่จะแสดง (รวม ... ถ้าจำเป็น)
  }
})
const emit = defineEmits(['page-change'])

/**
 * คืน array ของ page labels ที่จะโชว์ เช่น [1,'...',4,5,6,'...',10]
 */
const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  const maxVisible = Math.max(5, props.maxVisible) // min 5

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  const side = Math.floor((maxVisible - 3) / 2) // ส่วนข้างๆ current
  let left = Math.max(2, current - side)
  let right = Math.min(total - 1, current + side)

  // ปรับขอบถ้า current ใกล้ต้นหรือท้าย
  if (current - 1 <= side) {
    left = 2
    right = maxVisible - 2
  } else if (total - current <= side) {
    left = total - (maxVisible - 2)
    right = total - 1
  }

  pages.push(1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')
  pages.push(total)

  return pages
})

const goTo = (page) => {
  if (page === '...') return
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
const prev = () => {
  if (props.currentPage > 1) emit('page-change', props.currentPage - 1)
}
const next = () => {
  if (props.currentPage < props.totalPages) emit('page-change', props.currentPage + 1)
}
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-6">
    <!-- Prev -->
    <button
      @click="prev"
      :disabled="currentPage === 1"
      class="p-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label="Previous page"
    >
      <ChevronLeftIcon class="h-4 w-4" />
    </button>

    <!-- Pages -->
    <template v-for="p in visiblePages" :key="String(p)">
      <button
        v-if="p !== '...'"
        @click="goTo(p)"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full border text-xs font-medium transition-colors',
          currentPage === p
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
        ]"
        :aria-current="currentPage === p ? 'page' : null"
      >
        {{ p }}
      </button>

      <span v-else class="w-8 h-8 flex items-center justify-center text-gray-400 text-xs select-none">
        ...
      </span>
    </template>

    <!-- Next -->
    <button
      @click="next"
      :disabled="currentPage === totalPages"
      class="p-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label="Next page"
    >
      <ChevronRightIcon class="h-4 w-4" />
    </button>
  </div>
</template>

<style scoped>

</style>
