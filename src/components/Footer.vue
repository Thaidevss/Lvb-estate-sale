<template>
  <footer class="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-10">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      
      <!-- Logo + Hotline -->
      <div class="flex flex-col items-center md:items-start space-y-4">
        <img src="../assets/images/LVB-logo.png" alt="LaoViet Bank" class="h-12" />
        <div class="flex items-center gap-2">
          <i class="fas fa-phone"></i>
          <span>Hotline: 1440</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-globe"></i>
          <a href="https://laovietbank.com.la" class="hover:underline">www.laovietbank.com.la</a>
        </div>
        <div class="flex items-center gap-2">
          <i class="fab fa-facebook"></i>
          <a href="#" class="hover:underline">Facebook: LaoVietBank</a>
        </div>
      </div>

      <!-- Services -->
      <div class="flex flex-col items-center md:items-start space-y-3">
        <h3 class="text-lg font-semibold mb-2">ບໍລິການ</h3>
        <ul class="space-y-2">
          <li>Property Curation</li>
          <li>Investment Advisory</li>
          <li>Relocation Support</li>
          <li>Property Management</li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="flex flex-col items-center md:items-start space-y-3">
        <h3 class="text-lg font-semibold mb-2">ຕິດຕໍ່</h3>
        <div class="flex items-start gap-2">
          <MapPinIcon class="w-7 h-7"/>
          <p>
            ທີ່ຢູ່: 44 ຖະໜົນ ລ້ານຊ້າງ, ບ້ານຫັດສະດີ, ເມືອງ ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ
          </p>
        </div>
        <div class="flex items-center gap-2">
          <EnvelopeIcon class="w-5 h-5"/>
          <a href="mailto:info@laovietbank.com.la" class="hover:underline">info@laovietbank.com.la</a>
        </div>
        <div class="flex items-center gap-2">
          <PhoneIcon class="w-5 h-5"/>
          <span>+020 9999 8888</span>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="mt-10 border-t border-blue-700 pt-4 text-center text-xs">
      Copyright © 2025 Lao Viet Bank. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon
} from "@heroicons/vue/24/outline";
</script>
<style>
/* ถ้าใช้ Tailwind อยู่แล้วไม่จำเป็นต้องมี css เพิ่ม */
</style>
