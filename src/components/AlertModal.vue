<template>
  <teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 transition-opacity duration-300" :class="{'opacity-0': isClosing}">
      <div 
        class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full relative transition-all duration-300 transform border-t-8 border-b-5"
        :class="{
          'scale-0 opacity-0': isClosing,
          'animate-bounce-in': !isClosing,
          'border-red-500': type === 'error',
          'border-yellow-500': type === 'warning',
          'border-green-500': type === 'success',
          'border-blue-500': type === 'info'
        }"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-2">
          <component :is="iconComponent" class="w-16 h-16" :class="iconColor" />
        </div>

        <!-- Title -->
        <h3 class="text-xl font-semibold text-center mb-2" :class="titleColor">{{ title }}</h3>

        <!-- Message -->
        <p class="text-center mb-6" :class="textColor">{{ message }}</p>

        <!-- Buttons -->
        <div class="flex justify-center space-x-3">
          <button
            @click="confirm"
            class="text-white px-5 py-2 rounded-lg font-medium transition"
            :class="confirmButtonColor"
          >
            {{ confirmText }}
          </button>
          <button
            v-if="showCancel"
            @click="cancel"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium transition"
          >
            {{ cancelText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  InformationCircleIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  confirmText: {
    type: String,
    default: 'OK'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const visible = ref(false)
const title = ref('')
const message = ref('')
const type = ref('info') // 'info' | 'error' | 'success' | 'warning'
const showCancel = ref(false)
const isClosing = ref(false)
let resolveFn

// Icon mapping based on alert type
const iconComponent = computed(() => {
  switch (type.value) {
    case 'error': return XCircleIcon
    case 'success': return CheckCircleIcon
    case 'warning': return ExclamationTriangleIcon
    default: return InformationCircleIcon
  }
})

const iconColor = computed(() => {
  switch (type.value) {
    case 'error': return 'text-red-500'
    case 'success': return 'text-green-500'
    case 'warning': return 'text-yellow-500'
    default: return 'text-blue-500'
  }
})

const titleColor = computed(() => {
  switch (type.value) {
    case 'error': return 'text-red-600'
    case 'success': return 'text-green-600'
    case 'warning': return 'text-yellow-600'
    default: return 'text-blue-600'
  }
})

const textColor = computed(() => {
  switch (type.value) {
    case 'error': return 'text-red-700'
    case 'success': return 'text-green-700'
    case 'warning': return 'text-yellow-700'
    default: return 'text-gray-600'
  }
})

const confirmButtonColor = computed(() => {
  switch (type.value) {
    case 'error': return 'bg-red-500 hover:bg-red-600'
    case 'success': return 'bg-green-500 hover:bg-green-600'
    case 'warning': return 'bg-yellow-500 hover:bg-yellow-600'
    default: return 'bg-blue-500 hover:bg-blue-600'
  }
})

function open({ 
  title: t, 
  message: m, 
  type: tp = 'info', 
  showCancel: c = false,
  confirmText = 'OK',
  cancelText = 'Cancel'
}) {
  title.value = t
  message.value = m
  type.value = tp
  showCancel.value = c
  isClosing.value = false
  visible.value = true

  return new Promise(resolve => {
    resolveFn = resolve
  })
}

function closeAlert(result) {
  isClosing.value = true
  setTimeout(() => {
    visible.value = false
    if (resolveFn) {
      resolveFn(result)
    }
  }, 300)
}

function confirm() {
  closeAlert('confirm')
}

function cancel() {
  closeAlert('cancel')
}

defineExpose({ open, close: closeAlert })
</script>

<style>
@keyframes bounce-in {
  0% { transform: scale(0.7); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
.animate-bounce-in { animation: bounce-in 0.5s ease-out forwards; }
</style>