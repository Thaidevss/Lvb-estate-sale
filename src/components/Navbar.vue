<template>
  <nav class="bg-gradient-to-r from-blue-600 to-blue-900 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-18 ">
        <div class="flex-shrink-0 flex items-center pr-4 border-r border-white h-12">
            <img 
                src="../assets/images/LVB-logo.png" 
                alt="LAOVIET Bank Logo"
                class="h-13 w-auto"
            >
        </div>


        <div class="hidden md:flex flex-col items-center justify-center flex-1">
            <span class="text-white text-md tracking-wider shadow-2xl">
                ທະນາຄານ ຮ່ວມທຸລະກິດລາວ - ຫວຽດຈໍາກັດ
            </span>
            <span class="text-white text-md tracking-wider shadow-2xl">
                ຂົວຕໍ່ແຫ່ງຜົນສຳເລັດ
            </span>
        </div>
            <div class="relative w-32 h-32">
                <img 
                src="../assets/images/flower-2.png" 
                alt="Flower"
                class="absolute  top-8 right-30 h-28 w-24 opacity-90"
                style="transform: rotate(-5deg)"
                >
                <img 
                    src="../assets/images/flower-1.png" 
                    alt="Flower"
                    class="absolute top-5 right-4 h-32 w-32 opacity-80"
                    style="transform: rotate(5deg)"
                >
                <img 
                    src="../assets/images/flower-1.png" 
                    alt="Flower"
                    class="absolute top-2 right-0 left-22 h-20 w-20 opacity-70"
                    style="transform: rotate(15deg)"
                >
                <img 
                    src="../assets/images/flower-1.png" 
                    alt="Flower"
                    class="absolute top-17 right-0 left-35 h-8 w-8 opacity-100"
                    style="transform: rotate(15deg)"
                >
            </div>


        <!-- Mobile menu button (สำหรับ responsive) -->
        <div class="md:hidden flex items-center">
          <button 
            @click="isOpen = !isOpen"
            class="text-white focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu (จะแสดงเมื่อหน้าจอเล็ก) -->
      <div v-if="isOpen" class="md:hidden pb-2">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          <!-- <span class="text-white font-bold block">LAOVIET Bank</span> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
/* เพิ่ม animation สำหรับดอกไม้ */
.relative:hover img:last-child {
  transform: rotate(-15deg);
  transition: transform 0.3s ease;
}
</style>