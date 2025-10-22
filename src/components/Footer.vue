<template>
  <footer class="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        <!-- Logo & Hotline Section -->
        <div class="md:col-span-4 flex flex-col space-y-6">
          <div>
            <img 
              src="../assets/images/LVB logo with full name-white.png" 
              alt="LaoViet Bank" 
              class="mb-4" 
            />
          </div>
        </div>

        <!-- Address Section -->
        <div class="md:col-span-4">
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-blue-600/40">
            ທີ່ຕັ້ງສໍານັກງານໃຫຍ່
          </h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <MapPinIcon class="w-6 h-6 flex-shrink-0 text-blue-300 mt-1"/>
              <p class="text-sm text-blue-100 leading-relaxed">
                <!-- {{ $t("footer.address") }} -->
                ທີ່ຢູ່: 44 ຖະໜົນ ລ້ານຊ້າງ, ບ້ານຫັດສະດີ, ເມືອງ ຈັນທະບູລີ,<br> ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ
              </p>
            </div>
            
            <div class="flex gap-3">
              <PhoneIcon class="w-6 h-6 flex-shrink-0 text-blue-300"/>
              <div class="text-sm text-blue-100">
                <p class="font-medium mb-1">ເບີໂທລະສັບ:</p>
                <p class="leading-relaxed">
                  (856-21) 251-418 / 216-316
                  214-337 / 244-229
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact & Social Section -->
        <div class="md:col-span-4">
          <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-blue-600/40">
            ຕິດຕໍ່ພວກເຮົາ
          </h3>
          <div class="space-y-3">
            <a 
              href="https://laovietbank.com.la" 
              target="_blank" 
              class="flex items-center gap-3 text-sm text-blue-100 hover:text-white transition-colors group"
            >
              <img 
                src="../assets/images/worldwide.png" 
                class="h-5 w-5 invert brightness-0 group-hover:scale-110 transition-transform" 
                alt="Website"
              />
              <span class="group-hover:underline">www.laovietbank.com.la</span>
            </a>
            
            <a 
              href="https://www.facebook.com/LaoVietBank" 
              target="_blank" 
              class="flex items-center gap-3 text-sm text-blue-100 hover:text-white transition-colors group"
            >
              <img 
                src="../assets/images/facebook-circular-logo.png" 
                class="h-5 w-5 invert brightness-0 group-hover:scale-110 transition-transform" 
                alt="Facebook"
              />
              <span class="group-hover:underline">LaoVietBank</span>
            </a>
            <div class="flex items-center gap-3">
              <img 
                src="../assets/images/telephone.png" 
                class="h-5 w-5 invert brightness-0" 
                alt="Hotline"
              />
              <span class="">1440</span>
            </div>
          </div>

          <!-- Quick Links (Optional) -->
          <!-- <div class="mt-6 pt-6 border-t border-blue-600/30">
            <p class="text-xs text-blue-300 uppercase tracking-wide mb-3">ລິ້ງດ່ວນ</p>
            <div class="flex flex-wrap gap-3">
              <a href="#" class="text-xs text-blue-200 hover:text-white transition-colors">ບໍລິການ</a>
              <span class="text-blue-600">•</span>
              <a href="#" class="text-xs text-blue-200 hover:text-white transition-colors">ກ່ຽວກັບເຮົາ</a>
              <span class="text-blue-600">•</span>
              <a href="#" class="text-xs text-blue-200 hover:text-white transition-colors">ຂ່າວສານ</a>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="border-t border-blue-700/50 bg-blue-950/30 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-blue-300">
          <p>© 2025 Lao Viet Bank. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-white transition-colors">ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ</a>
            <span class="text-blue-600">•</span>
            <a href="#" class="hover:text-white transition-colors">ເງື່ອນໄຂການໃຊ້ງານ</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
    PhoneIcon,
    MapPinIcon
} from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
</script>

<style scoped>
/* Optional: Add subtle animation on hover */
footer a {
  position: relative;
}

footer a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}

footer a:hover::after {
  width: 100%;
}
</style>