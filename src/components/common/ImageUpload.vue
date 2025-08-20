<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">ຮູບພາບໜ້າປົກ</label>
    
    <!-- แสดงรูปภาพเดิม (ถ้ามี) -->
    <div v-if="currentImageUrl" class="mb-2 flex items-center space-x-4">
      <img 
        :src="currentImageUrl" 
        class="w-32 h-32 object-cover rounded border"
        alt="Current profile image"
      >
      <div>
        <button 
          type="button"
          @click="removeImage"
          class="text-xs text-red-600 hover:text-red-800"
        >
          ລຶບຮູບນີ້
        </button>
      </div>
    </div>
    
    <!-- Input file ที่ซ่อนอยู่ -->
    <input 
      ref="fileInput"
      type="file"
      @change="handleFileChange"
      class="hidden"
      accept="image/*"
    >
    
    <!-- ปุ่มเลือกไฟล์ -->
    <button
      type="button"
      @click="$refs.fileInput.click()"
      class="w-full text-xs border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {{ currentImageUrl ? 'ເລືອກຮູບໃໝ່' : 'ເລືອກຮູບ' }}
    </button>
    
    <!-- แสดงชื่อไฟล์ที่เลือก -->
    <p v-if="selectedFile" class="text-xs text-gray-500 mt-1">
      ເລືອກ: {{ selectedFile.name }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  imageUrl: String
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const currentImageUrl = ref(props.imageUrl)
const selectedFile = ref(null)

watch(() => props.imageUrl, (newUrl) => {
  currentImageUrl.value = newUrl
})

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    currentImageUrl.value = URL.createObjectURL(file)
    emit('update:modelValue', file)
  }
}

const removeImage = () => {
  currentImageUrl.value = null
  selectedFile.value = null
  fileInput.value.value = ''
  emit('update:modelValue', null)
}
</script>