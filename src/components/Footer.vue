<template>
  <footer class="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-10">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      
      <!-- Logo + Hotline -->
      <div class="flex flex-col items-center md:items-start space-y-4">
        <img src="../assets/images/LVB-logo.png" alt="LaoViet Bank" class="h-12" />
        <div class="flex items-center gap-2">
          <i class="fas fa-phone"></i>
          <span class="flex item-center"><img src="../assets/images/telephone.png" class="h-6 w-6 me-2 invert brightness-0"  alt=""> Hotline: 1440</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="fas fa-globe"></i>
          <a href="https://laovietbank.com.la" target="_blank" class="hover:underline flex items-center"><img src="../assets/images/worldwide.png" class="h-6 w-6 me-2 invert brightness-0"  alt="">www.laovietbank.com.la</a>
        </div>
        <div class="flex items-center gap-2">
          <i class="fab fa-facebook"></i> 
          <a href="https://www.facebook.com/LaoVietBank" target="_blank" class="hover:underline flex items-center"><img src="../assets/images/facebook-circular-logo.png" class="h-6 w-6 me-2 invert brightness-0"  alt=""> LaoVietBank</a>
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
          <MapPinIcon class="w-8 h-8"/>
          <p>
            <!-- ທີ່ຢູ່: 44 ຖະໜົນ ລ້ານຊ້າງ, ບ້ານຫັດສະດີ, ເມືອງ ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ -->
            {{ $t("footer.address") }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <EnvelopeIcon class="w-6 h-6"/>
          <a href="mailto:info@laovietbank.com.la" class="hover:underline">info@laovietbank.com.la</a>
        </div>
        <div class="flex items-center gap-2">
          <PhoneIcon class="w-6 h-6"/>
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
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
</script>
<style>
/* ถ้าใช้ Tailwind อยู่แล้วไม่จำเป็นต้องมี css เพิ่ม */
</style>
